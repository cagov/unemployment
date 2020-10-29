# The two inputs for this script are intentionally not shared
# The users.py file is constant between runs and contains the hashes for all users
# The forms.json file is exported directly from CosmosDB using the Data Migration Tool

from users import *
import json
from datetime import date

with open('/scripts/forms.json') as json_file:
    data = json.load(json_file)

userIdsOnCompletedForms = [i['id'] for i in data]
incompleteUsers = list(set(userIds) - set(userIdsOnCompletedForms))

print(len(userIds));
print(len(userIdsOnCompletedForms));
print(len(incompleteUsers));

outputFilename = ('hashesForUsersWhoHaveNotCompletedTheForm-{}.txt'
    .format(date.today().strftime("%Y%m%d")))
with open(outputFilename, 'w') as file:
    file.writelines("%s\n" % user for user in incompleteUsers)
