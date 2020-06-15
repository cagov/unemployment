import pandas as pd

def print_invalid_rows(invalid_rows, row_name):
    global invalid_input
    if len(invalid_rows) > 0:
        print(f"there are invalid {row_name} rows:")
        print(invalid_rows)
        invalid_input = True

print("importing from users.csv...")
df = pd.read_csv("users.csv").apply(lambda x: x.str.strip()) # remove leading and trailing whitespace

print("checking for errors...")

print("checking if hashes are all present and valid...")
hash_length = 11
invalid_hash_rows = df[df["hash"].apply(lambda x: len(str(x)) != hash_length)]
print_invalid_rows(invalid_hash_rows, "hash")

print("checking if WeekEndingDate values are all present and valid...")
valid_weeks = ["3/15/20",
  "3/22/20",
  "3/29/20",
  "4/5/20",
  "4/12/20",
  "4/19/20",
  "4/26/20",
  "5/3/20"
]
invalid_week_rows = df[~df["WeekEndingDate"].isin(valid_weeks)]
print_invalid_rows(invalid_week_rows, "WeekEndingDate")

print("checking if Program values are all present and valid...")
valid_programs = ["DUA", "UI"]
invalid_program_rows = df[~df["Program"].isin(valid_programs)]
print_invalid_rows(invalid_program_rows, "Program")

print("checking if SeekWorkPlan values are all present and valid...")
valid_plans = ["UI part time", "UI full time", "PUA full time"]
invalid_plan_rows = df[~df["SeekWorkPlan"].isin(valid_plans)]
print_invalid_rows(invalid_plan_rows, "SeekWorkPlan")

if invalid_input is not True:
    print("first few rows of output:")
    output = df.groupby("hash")["WeekEndingDate"].apply(list).reset_index()\
                .rename(columns={"WeekEndingDate": "WeekEndingDates"})

    print(output.head())

    print("writing results to users.json")
    df.to_json("users.json", orient="records")
