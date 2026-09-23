import os
import glob
import re

html_files = glob.glob('*.html')

for file in html_files:
    if file == 'index.html':
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Remove the toggle from header
    header_toggle_pattern = re.compile(r'\s*<button id="mobile-theme-toggle"[^>]*>\s*<i class="fas fa-moon dark:hidden"></i>\s*<i class="fas fa-sun hidden dark:block"></i>\s*</button>')
    new_content = header_toggle_pattern.sub('', content)
    
    # 2. Add to mobile menu
    menu_target_pattern = re.compile(r'<div class="mt-8 flex flex-col gap-4">\s*<button id="mobile-rtl-toggle"')
    
    def repl(m):
        return '''<div class="mt-8 flex flex-col gap-4">
                <button id="mobile-theme-toggle"
                    class="bg-industrial-100 dark:bg-industrial-800 text-industrial-800 dark:text-industrial-200 text-center px-5 py-3 rounded font-medium flex items-center justify-center gap-2">
                    <i class="fas fa-moon dark:hidden"></i>
                    <i class="fas fa-sun hidden dark:block"></i>
                    <span class="dark:hidden">Dark Mode</span>
                    <span class="hidden dark:block">Light Mode</span>
                </button>
                <button id="mobile-rtl-toggle"'''
    
    new_content = menu_target_pattern.sub(repl, new_content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {file}')
    else:
        print(f'No changes for {file}')
