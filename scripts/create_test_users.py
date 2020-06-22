#!/usr/bin/env python3
'''Generate database entries as JSON to upload to the staging database.
'''

import datetime
import hashlib
import json
import random

NUM_WEEKS = 14
PUA_FULL_TIME = 'PUA full-time'
UI_FULL_TIME = 'UI full-time'
UI_PART_TIME = 'UI part-time'
WORK_PLANS = [
  PUA_FULL_TIME,
  UI_FULL_TIME,
  UI_PART_TIME,
]
# last name, dob, ssn, seekWorkPlan, weeksToCertify
TEST_USERS = [
    ['Villanueva', datetime.date(2000, 1, 1), '123456789', PUA_FULL_TIME, [0]],
    ['Jarvis', datetime.date(1989, 2, 2), '987654321', UI_FULL_TIME, [5, 6, 7]],
    ['Summers', datetime.date(1991, 3, 3), '111223333', UI_PART_TIME, [0, 1, 2, 3]],
    ['Salazar', datetime.date(1972, 4, 4), '333221111', PUA_FULL_TIME, [12, 13]],
    ["O'Brien", datetime.date(1968, 5, 5), '666778888', UI_FULL_TIME, [4, 6]],
    ['Monroe', datetime.date(1955, 6, 16), '000998888', UI_PART_TIME, [0]],
    ['Frazier', datetime.date(1994, 7, 31), '222446666', PUA_FULL_TIME, [5, 6, 7]],
    ['Hodges', datetime.date(1985, 8, 20), '000886666', UI_FULL_TIME, [0, 1, 2, 3]],
    ['Romero', datetime.date(1976, 9, 12), '111335555', UI_PART_TIME, [12, 13]],
    ['Ward', datetime.date(1977, 10, 24), '999775555', PUA_FULL_TIME, [4, 6]],
    ['Hardin', datetime.date(1988, 11, 28), '135792468', UI_FULL_TIME, [0]],
    ['Franco', datetime.date(1972, 12, 25), '086429753', UI_PART_TIME, [5, 6, 7]],
]

def get_hash(name, dob, ssn):
  assert len(ssn) == 9
  h = hashlib.sha256(bytes(name.lower() + dob.strftime('%Y-%M-%d') + ssn, 'utf-8'))
  return h.hexdigest()

def generate_test_users():
  users = []
  for user in TEST_USERS:
      users.append({
          'id': get_hash(*user[:3]),
          'seekWorkPlan': user[3],
          'weeksToCertify': user[4],
      })
  with open('test_users.json', 'w') as outfile:
      outfile.write(json.dumps(sorted(users, key=lambda d: d['id'])))

def generate_batch_users(num_users=30):
    users = []
    for i in range(num_users):
        name = 'last' + str(i)
        dob = datetime.date(1990, 1, 1) + datetime.timedelta(days=i)
        ssn = str(100000000 + i)

        # Maybe make it so that this is more likely to have say, 2
        # weeks to certify rather than 10.
        weeks_to_certify = random.sample(
            range(NUM_WEEKS), random.randint(1, NUM_WEEKS - 1))
        weeks_to_certify.sort()

        users.append({
            'id': get_hash(name, dob, ssn),
            'seekWorkPlan': WORK_PLANS[i % 3],
            'weeksToCertify': weeks_to_certify,
        })

    with open('batch_users.json', 'w') as outfile:
        outfile.write(json.dumps(sorted(users, key=lambda d: d['id'])))

generate_test_users()
generate_batch_users()
