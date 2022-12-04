import re
from os import listdir, path, rename

required_series_folder = ""
season_regex = r"s(eason)?[. ]?\d{1,2}"


def main():
  set_required_series_folder()
  for folder in get_folders():
    match_result = re.search(season_regex, folder, re.IGNORECASE)
    if not match_result:
      raise NotSeasonFolder(f"\"{folder}\" folder name doesn't have any hint for a season number.")
    current_season = match_result.group()
    season_number = re.search(r"\d{1,2}", current_season).group()
    rename(folder, get_folder_path(f"S{season_number.zfill(2)}")) 
  print("\n  DONE\n") 


def get_folders():
  current_dir = listdir(required_series_folder)
  return [get_folder_path(folder) for folder in list(filter(lambda x: path.isdir(path.join(required_series_folder, x)), current_dir))]


def get_folder_path(folder):
  return path.join(required_series_folder, folder)


def set_required_series_folder():
  global required_series_folder
  entered_string = input("What series folder to rename its seasons folders? \n>>  ") 
  if path.exists(entered_string) and path.isdir(entered_string):
    required_series_folder = entered_string
  else:
    raise NotFolder("No such folder!") 

# Exceptions
class NotFolder(Exception): 
  pass


class NotSeasonFolder(Exception):
  pass


if __name__ == "__main__":
  main()
