#!/usr/bin/env python3
'''Generate database entries as JSON to upload to the staging database.
'''

import datetime
import hashlib
import json
import random

SOURCE = 'script' + datetime.datetime.now().strftime('%Y%m%d.%H%M%S')

NUM_WEEKS = 14
PUA_FULL_TIME = 'PUA full time'
UI_FULL_TIME = 'UI full time'
UI_PART_TIME = 'UI part time'
WORK_PLANS = [
  PUA_FULL_TIME,
  UI_FULL_TIME,
  UI_PART_TIME,
]
# last name, dob, ssn, programPlan, weeksToCertify
TEST_USERS = [
    ['Villanueva', datetime.date(2000, 1, 1), '123456789', [PUA_FULL_TIME], [0]],
    ['Jarvis', datetime.date(1989, 2, 2), '098765432', [UI_FULL_TIME], [5, 6, 7]],
    ['Summers', datetime.date(1991, 3, 3), '111223333', [UI_PART_TIME], [0, 1, 2, 3]],
    ['Salazar', datetime.date(1972, 4, 4), '333221111', [PUA_FULL_TIME], [12, 13]],
    ["O'Brien", datetime.date(1968, 5, 5), '555667777', [UI_FULL_TIME], [4, 6]],
    ['Monroe', datetime.date(1955, 6, 16), '000998888', [UI_PART_TIME], [0]],
    ['Frazier', datetime.date(1994, 7, 31), '222446666', [PUA_FULL_TIME], [5, 6, 7]],
    ['Hodges', datetime.date(1985, 8, 20), '000886666', [UI_FULL_TIME], [0, 1, 2, 3]],
    ['Romero', datetime.date(1976, 9, 12), '111335555', [UI_PART_TIME], [12, 13]],
    ['Ward', datetime.date(1977, 10, 24), '888776666', [PUA_FULL_TIME], [4, 6]],
    ['Hardin', datetime.date(1988, 11, 28), '135792468', [UI_FULL_TIME], [0]],
    ['Franco', datetime.date(1972, 12, 25), '086429753', [UI_PART_TIME], [5, 6, 7]],
    ['Bentley', datetime.date(1974, 1, 12), '842602372', [PUA_FULL_TIME], [0]],
    ['Perry', datetime.date(1979, 8, 10), '442122888', [PUA_FULL_TIME], [5, 6, 7]],
    ['Ochoa', datetime.date(1987, 11, 14), '164092346', [PUA_FULL_TIME], [5, 6, 7]],
    ['Chen', datetime.date(1999, 3, 18), '362983402', [PUA_FULL_TIME], [5, 6, 7]],
    ['Clayton', datetime.date(2000, 6, 29), '865612736', [UI_FULL_TIME], [0]],
    ['Hernandez', datetime.date(2001, 7, 26), '256827264', [UI_FULL_TIME], [5, 6, 7]],
    ['Davis', datetime.date(1991, 1, 19), '871503066', [UI_FULL_TIME], [5, 6, 7]],
    ['Maldonado', datetime.date(1985, 11, 4), '310354248', [UI_FULL_TIME], [5, 6, 7]],
    ['Morton', datetime.date(1994, 6, 14), '708298431', [UI_PART_TIME], [0]],
    ['Castro', datetime.date(1952, 3, 16), '184106601', [UI_PART_TIME], [5, 6, 7]],
    ['Mata', datetime.date(1929, 9, 16), '385979922', [UI_PART_TIME], [5, 6, 7]],
    ['Wong', datetime.date(1990, 10, 26), '459737859', [UI_PART_TIME], [5, 6, 7]],
    ['Marsh', datetime.date(1972, 12, 19), '149255069', [PUA_FULL_TIME, UI_FULL_TIME], [4, 6]],
    ['Gonzales', datetime.date(1968, 12, 21), '403810601', [PUA_FULL_TIME, UI_FULL_TIME], [0, 1]],
    ['Singh', datetime.date(1954, 5, 23), '219212666', [PUA_FULL_TIME, UI_FULL_TIME], [2, 3]],
    ['Scott', datetime.date(2004, 5, 8), '715799381', [PUA_FULL_TIME, UI_FULL_TIME], [12, 13]],
    ['Singleton', datetime.date(1951, 9, 10), '495635826', [PUA_FULL_TIME, UI_PART_TIME], [5, 6]],
    ['Andrade', datetime.date(1958, 1, 22), '146838421', [PUA_FULL_TIME, UI_PART_TIME], [0, 1]],
    ['Mckay', datetime.date(1972, 4, 5), '525598847', [PUA_FULL_TIME, UI_PART_TIME], [6, 7]],
    ['Wyatt', datetime.date(1971, 3, 19), '450745912', [PUA_FULL_TIME, UI_PART_TIME], [8, 9]],
    ['Dunn', datetime.date(1997, 1, 4), '172089111', [PUA_FULL_TIME, UI_FULL_TIME, UI_PART_TIME], [5, 6, 7]],
    ['Neal', datetime.date(1939, 2, 8), '236990877', [PUA_FULL_TIME, UI_FULL_TIME, UI_PART_TIME], [5, 6, 7]],
    ['Fernandez', datetime.date(1944, 9, 8), '701516075', [PUA_FULL_TIME, UI_FULL_TIME, UI_PART_TIME], [5, 6, 7]],
    ['Mahoney', datetime.date(1982, 10, 18), '556982378', [PUA_FULL_TIME, UI_FULL_TIME, UI_PART_TIME], [5, 6, 7]],
    ['Dickson', datetime.date(1989, 12, 25), '242203500', [PUA_FULL_TIME, UI_FULL_TIME, UI_PART_TIME], [5, 6, 7]],
    ['Savage', datetime.date(1992, 3, 24), '866512308', [PUA_FULL_TIME, UI_FULL_TIME, UI_PART_TIME], [5, 6, 7]],
    ['Sellers', datetime.date(1978, 7, 19), '106499892', [PUA_FULL_TIME, UI_FULL_TIME, UI_PART_TIME], [5, 6, 7]],
    ['Watson', datetime.date(1961, 2, 4), '856919272', [PUA_FULL_TIME, UI_FULL_TIME, UI_PART_TIME], [5, 6, 7]],
    ['Burton', datetime.date(1962, 5, 15), '698860129', [PUA_FULL_TIME, UI_FULL_TIME, UI_PART_TIME], [5, 6, 7]],
    ['Conway', datetime.date(1965, 5, 17), '633774295', [PUA_FULL_TIME, UI_FULL_TIME, UI_PART_TIME], [5, 6, 7]]
]

def get_hash(name, dob, ssn):
  assert len(ssn) == 9
  h = hashlib.sha256(bytes(name.lower() + dob.strftime('%m-%d-%Y') + ssn, 'utf-8'))
  return h.hexdigest()

def generate_test_users():
  users = []
  for user in TEST_USERS:
      users.append({
          'id': get_hash(*user[:3]),
          'programPlan': user[3],
          'weeksToCertify': user[4],
          'source': SOURCE,
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
            'programPlan': [WORK_PLANS[i % 3]],
            'weeksToCertify': weeks_to_certify,
            'source': 'batch' + SOURCE
        })

    with open('batch_users.json', 'w') as outfile:
        outfile.write(json.dumps(sorted(users, key=lambda d: d['id'])))

generate_test_users()
generate_batch_users()
