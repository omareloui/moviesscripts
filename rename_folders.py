import re
from os import listdir, path, rename


HOME = path.expanduser("~")
LIBRARY_ROOT = f"{HOME}/Movies and Series"

def get_full_folder_path(folder):
  return path.join(LIBRARY_ROOT, folder)

all_folders = listdir(LIBRARY_ROOT)
wanted_folders = list(filter(lambda f: f[0] != "." and path.isdir(get_full_folder_path(f)), all_folders))


for folder in wanted_folders:
    date_regex = r"\[\d{4}-?(\d{4})?\]"
    bracets_regex = r"\[|\]"
    date = re.search(date_regex, folder).group()
    final_name = f"T MV {re.sub(bracets_regex, '', date)} {re.sub(date_regex, '', folder)}".strip()

    rename(get_full_folder_path(folder), get_full_folder_path(final_name))

print("done")
