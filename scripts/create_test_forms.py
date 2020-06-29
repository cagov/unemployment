#!/usr/bin/env python3
'''Generate test form entries/items as JSON to use for load testing.
'''

import json
import uuid

NUM_TEST_FORMS = 100

def get_uuid():
  return 'test' + uuid.uuid4()

def generate_test_forms(num_test_forms):
  forms = []
  for i in range(num_test_forms):
      # 1. id must be unique because the forms container partitions on it (/id)
      # 2. authToken must be unique because our code looks for a unique authtoken
      forms.append({
          'id': get_uuid(),
          'authToken': get_uuid(),
          'formData': "test"
      })
  with open('test_forms.json', 'w') as outfile:
      outfile.write(json.dumps(sorted(forms, key=lambda d: d['id'])))

generate_test_forms(NUM_TEST_FORMS)
