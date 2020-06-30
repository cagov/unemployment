#!/usr/bin/env python3
'''Generate test form entries/items as JSON to use for load testing.
'''

import json
import csv
import uuid

NUM_TEST_FORMS = 100000

def get_uuid():
  return 'test' + str(uuid.uuid4())

def generate_test_form_data(num_test_forms):
  uuids = []
  for i in range(num_test_forms):
    uuids.append(get_uuid())
  return uuids

def generate_test_form_json(test_form_data):
  forms = []
  for uuid in test_form_data:
      # 1. id must be unique because the forms container partitions on it (/id)
      # 2. authToken must be unique because our code looks for a unique authtoken
      forms.append({
          'id': uuid,
          'authToken': uuid,
          'formData': "initial data"
      })
  with open('test_forms.json', 'w') as outfile:
      outfile.write(json.dumps(sorted(forms, key=lambda d: d['id'])))

def generate_test_form_csv(test_form_data):
  with open('test_forms.csv', 'w') as outfile:
      writer = csv.writer(outfile, delimiter=',', lineterminator='\n')
      writer.writerow(['authToken'])
      for uuid in test_form_data:
        writer.writerow([uuid])

data = generate_test_form_data(NUM_TEST_FORMS)
generate_test_form_json(data)
generate_test_form_csv(data)
