import pandas as pd

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

HASH_LENGTH = 11
VALID_WEEKS = ["3/15/20",
  "3/22/20",
  "3/29/20",
  "4/5/20",
  "4/12/20",
  "4/19/20",
  "4/26/20",
  "5/3/20"
]
VALID_PROGRAMS = ["DUA", "UI"]
VALID_PLANS = ["UI part time", "UI full time", "PUA full time"]

print("Importing from users.csv...")
df = pd.read_csv("users.csv")\
        .apply(lambda x: x.str.strip()) # remove leading and trailing whitespace
row_count = len(df)
print(f"Imported {row_count} rows.\n")

print("Validating hashes are all present and valid...")
invalid_hash_rows = df[df["hash"].apply(lambda x: len(str(x)) != HASH_LENGTH)]
print_invalid_rows(invalid_hash_rows, "hash")

validate_column("WeekEndingDate", VALID_WEEKS)
validate_column("Program", VALID_PROGRAMS)
validate_column("SeekWorkPlan", VALID_PLANS)

if invalid_input is not True:
    print("First few rows of output:")
    output = df.groupby("hash")["WeekEndingDate"].apply(list).reset_index()\
                .rename(columns={"WeekEndingDate": "WeekEndingDates"})

    print(output.head())

    print("Writing results to users.json")
    df.to_json("users.json", orient="records")
