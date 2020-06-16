import pandas as pd

invalid_input = False
def print_invalid_rows(invalid_rows, row_name):
    global invalid_input
    invalid_row_count = len(invalid_rows)
    if invalid_row_count > 0:
        print(f"Invalid {row_name} rows ({invalid_row_count}) listed below:")
        print(invalid_rows)
        print()
        invalid_input = True

def validate_column(col_name, valid_values):
    print(f"Validating {col_name} values are all present and valid...")
    invalid_rows = df[~df[col_name].isin(valid_values)]
    print_invalid_rows(invalid_rows, col_name)

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
VALID_PROGRAMS = ["DUA", "UI"]
VALID_PLANS = ["UI part time", "UI full time", "PUA full time"]
INPUT_DATA_FILENAME = "users.csv"
PROCESSED_DATA_FILENAME = "processed.json"
FINAL_DATA_FILENAME = "final.json"

print(f"Importing from {INPUT_DATA_FILENAME} and removing leading/trailing whitespace...")
df = pd.read_csv(INPUT_DATA_FILENAME).apply(lambda x: x.str.strip())
row_count = len(df)
print(f"Imported {row_count} rows.\n")

print("Validating SHA256_hash values are all present and valid...")
invalid_hash_rows = df[df["SHA256_hash"].apply(lambda x: len(str(x)) != HASH_LENGTH)]
print_invalid_rows(invalid_hash_rows, "SHA256_hash")

validate_column("WeekEndingDate", VALID_WEEKS)
validate_column("Program", VALID_PROGRAMS)
validate_column("SeekWorkPlan", VALID_PLANS)

if invalid_input is not True:
    print("All values valid!\n")
    print("Grouping by SHA256_hash/user and merging all WeekEndingDates into one array per user...")
    output = df.groupby("SHA256_hash")["WeekEndingDate"].apply(list)\
        .reset_index().rename(columns={"WeekEndingDate": "WeekEndingDates"}) # todo fix this line
    result_count = len(output)

    print(f"{result_count} resulting users. Here's a few sample rows:")
    print(output.head())

    print(f"Writing results to {OUTPUT_DATA_FILENAME}...")
    df.to_json(OUTPUT_DATA_FILENAME, orient="records")

    print("Success!")
