import requests
import sys

def is_link_valid(link):
    r = requests.get(link, stream=True)
    return r.status_code == 200


if __name__ == "__main__":
    link = sys.argv[1]
    print(link)
    print(is_link_valid(link))
