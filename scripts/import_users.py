#!/usr/bin/env python3

import pandas as pd
# Note on the modin library: modin enables using multiple cores for pandas
# but is "not yet optimized" for all groupby operations,
# and isn't optimized for the groupby operation used in this script

# Options to set before running the script
use_subset_of_data = False  # Set to True if you're developing and want operations to take less time
generate_from_source = False  # Set to True to regenerate intermediate data first, vs loading saved intermediate data

# Increase amount of data displayed in terminal
pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 200)
pd.set_option('display.width', 1000)

HASH_LENGTH = 66
VALID_WEEKS = [
    "2020-02-08",
    "2020-02-15",
    "2020-02-22",
    "2020-02-29",
    "2020-03-07",
    "2020-03-14",
    "2020-03-21",
    "2020-03-28",
    "2020-04-04",
    "2020-04-11",
    "2020-04-18",
    "2020-04-25",
    "2020-05-02",
    "2020-05-09"
]
WEEKS_TO_INDEX = dict(map(reversed, enumerate(VALID_WEEKS)))  # { "2020-04-15": 0 ... }
INDEX_TO_WEEKS = dict(enumerate(VALID_WEEKS))  # { 0: "2020-04-15"... }
VALID_PROGRAMS = ["DUA", "UI"]
VALID_PLANS = ["UI part time", "UI full time", "PUA full time"]
SOURCE_DATA_FILENAME = "users.csv"
INTERMEDIATE_DATA_FILENAME = "intermediate.pkl"
INTERMEDIATE_DATA_100K_FILENAME = "100k.pkl"  # Generate a smaller file of 100k rows during development process
DUPLICATE_HASHES_FILENAME = "duplicate_hashes.xlsx"
FINAL_DATA_100K_FILENAME = "100k.json"
FINAL_DATA_FILENAME = "users.json"
FINAL_COLUMN_NAMES = ["willBeNamedId", "programPlan", "weeksToCertify"]

intermediate_filename = INTERMEDIATE_DATA_FILENAME
final_filename = FINAL_DATA_FILENAME
if use_subset_of_data:
    intermediate_filename = INTERMEDIATE_DATA_100K_FILENAME
    final_filename = FINAL_DATA_100K_FILENAME


def generate_final_file():
    def print_rows_with_week_count(df, count):
        print(df.loc[df["week_count"] == count])

    # Print the number of users who need to certify for a total of X weeks, 1 through 14
    # # of weeks  # of users who must certify
    #           1                  19280
    #           2                  808167
    def print_total_weeks_by_user(df):
        df["week_count"] = df["WeekEndingDates"].apply(lambda x: len(x))  # Count number of weeks per user
        series = df["week_count"].value_counts(normalize=True).sort_index().mul(100).round(1).astype(str) + '%'
        result = pd.DataFrame(series).reset_index()
        result.columns = ["# of weeks", "% of users who must certify"]
        print(result.to_string(index=False))

    def print_duplicate_hashes(df):
        # df.pivot_table(index=["SHA256_hash"], aggfunc="size").sort_values()
        df["WeekEndingDates"] = df["WeekEndingDates"].apply(lambda x: [INDEX_TO_WEEKS[y] for y in x])
        dupe_hashes = df[df.duplicated("SHA256_hash", keep=False)]
        dupe_hashes_count = len(dupe_hashes)
        print(f"There are {dupe_hashes_count} duplicate hashes:")
        print(dupe_hashes)
        dupe_hashes.to_excel(DUPLICATE_HASHES_FILENAME)


    print(f"Importing {intermediate_filename}...")
    df = pd.read_pickle(intermediate_filename)
    # insert your code here or choose one of the print_* functions above
    print_duplicate_hashes(df)
    df.drop(columns="Program", inplace=True)
    df.columns = FINAL_COLUMN_NAMES
    df.to_json(final_filename, orient="records")

# We generate an intermediate file and write it to disk because the groupby is the biggest chunk of work
# and doesn't need to be repeated unless the source CSV has changed
def generate_intermediate_file():
    invalid_input = False

    def validate(df):
        print("Validating SHA256_hash values are all present and valid...")
        invalid_hash_rows = df[df["SHA256_hash"].apply(lambda x: len(str(x)) != HASH_LENGTH)]
        print_invalid_rows(df, invalid_hash_rows, "SHA256_hash")

        validate_column(df, "WeekEndingDate", VALID_WEEKS)
        validate_column(df, "Program", VALID_PROGRAMS)
        validate_column(df, "SeekWorkPlan", VALID_PLANS)

    def generate_intermediate_data(df):
        print(
            "Grouping by SHA256_hash/user, replacing WeekEndingDates with indices, merging all WeekEndingDates into one array per user...")
        if use_subset_of_data:
            print("Selecting first 100,000 rows (use_subset_of_data)")
            df = df.head(100000)
        output = df.replace({"WeekEndingDate": WEEKS_TO_INDEX}) \
            .groupby(["SHA256_hash", "Program", "SeekWorkPlan"]).agg(list) \
            .reset_index().rename(columns={"WeekEndingDate": "WeekEndingDates"})
        result_count = len(output)

        print(f"{result_count} resulting users. Here's a few sample rows:")
        print(output.head())

        return output

    def print_invalid_rows(df, invalid_rows, row_name):
        invalid_row_count = len(invalid_rows)
        if invalid_row_count > 0:
            print(f"Invalid {row_name} rows ({invalid_row_count}) listed below:")
            print(invalid_rows)
            print()
            invalid_input = True

    def validate_column(df, col_name, valid_values):
        print(f"Validating {col_name} values are all present and valid...")
        invalid_rows = df[~df[col_name].isin(valid_values)]
        print_invalid_rows(df, invalid_rows, col_name)

    def print_duplicate_program_weeks(df):
        dupe_hashes = df[df.duplicated(["SHA256_hash", "WeekEndingDate"], keep=False)]
        dupe_hashes_count = len(dupe_hashes)
        user = len(dupe_hashes)
        unique_users_count = len(dupe_hashes["SHA256_hash"].unique())
        print(
            f"There are {unique_users_count} users with both UI and PUA entries for the same week, over {dupe_hashes_count} records:")
        print(dupe_hashes)

    print(f"Importing from {SOURCE_DATA_FILENAME} and removing leading/trailing whitespace...")
    df = pd.read_csv(SOURCE_DATA_FILENAME).apply(lambda x: x.str.strip())
    row_count = len(df)
    print(f"Imported {row_count} rows.\n")
    validate(df)

    # Insert your own code here or print_duplicate_program_weeks(df)

    if invalid_input is True:
        print("Not generating intermediate file due to invalid input")
        exit()
    print("All values valid!\n")

    output = generate_intermediate_data(df)

    print(f"Writing results to {intermediate_filename}...")
    output.to_pickle(intermediate_filename)

    print("Success!")


if generate_from_source:
    generate_intermediate_file()
generate_final_file()
