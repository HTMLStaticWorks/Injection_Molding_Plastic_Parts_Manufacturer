import glob

old_theme_btn = '<button id="theme-toggle" class="text-industrial-500 hover:text-accent-500 dark:text-industrial-400 dark:hover:text-accent-400 transition-colors w-8 h-8 rounded-full flex items-center justify-center bg-industrial-100 dark:bg-industrial-800">'
new_theme_btn = '<button id="theme-toggle" class="text-industrial-500 hover:text-accent-500 dark:text-industrial-400 dark:hover:text-accent-400 transition-colors w-10 h-10 rounded shadow-sm border border-gray-100 dark:border-industrial-700 flex items-center justify-center bg-white dark:bg-industrial-800">'

old_rtl_btn = '<button id="rtl-toggle" class="text-industrial-500 hover:text-accent-500 dark:text-industrial-400 dark:hover:text-accent-400 transition-colors w-8 h-8 rounded-full flex items-center justify-center bg-industrial-100 dark:bg-industrial-800 font-bold text-xs">'
new_rtl_btn = '<button id="rtl-toggle" class="text-industrial-500 hover:text-accent-500 dark:text-industrial-400 dark:hover:text-accent-400 transition-colors w-10 h-10 rounded shadow-sm border border-gray-100 dark:border-industrial-700 flex items-center justify-center bg-white dark:bg-industrial-800 font-bold text-xs">'

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_theme_btn in content or old_rtl_btn in content:
        content = content.replace(old_theme_btn, new_theme_btn)
        content = content.replace(old_rtl_btn, new_rtl_btn)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {filepath}')
