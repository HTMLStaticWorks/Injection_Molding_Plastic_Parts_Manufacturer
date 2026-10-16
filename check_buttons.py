import glob
import re

html_files = glob.glob('*.html')
print(f"{'FILE':<20} | {'DESKTOP TOGGLE':<16} | {'MOBILE HEADER':<16} | {'MOBILE DRAWER':<16} | {'SCRIPT.JS':<10}")
print("-" * 85)

for f in sorted(html_files):
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    has_desktop = bool(re.search(r'id=["\']theme-toggle["\']', c))
    has_mob_header = bool(re.search(r'class=["\'][^"\']*theme-toggle-btn', c))
    has_mob_drawer = bool(re.search(r'id=["\']mobile-theme-toggle["\']', c))
    has_script = bool('script.js' in c)
    print(f"{f:<20} | {str(has_desktop):<16} | {str(has_mob_header):<16} | {str(has_mob_drawer):<16} | {str(has_script):<10}")
