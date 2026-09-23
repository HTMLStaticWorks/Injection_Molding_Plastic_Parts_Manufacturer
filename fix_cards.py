import glob

for filepath in ['blog.html', 'index.html', 'capabilities.html', 'home-2.html', 'about.html']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if filepath == 'blog.html':
        # Add text-justify to p tags in articles
        content = content.replace('mb-4 flex-grow', 'mb-4 flex-grow text-justify')
        # Add min height to headings
        content = content.replace('text-industrial-900 dark:text-white mb-3', 'text-industrial-900 dark:text-white mb-3 md:min-h-[3.5rem]')
        
    elif filepath in ['index.html', 'capabilities.html']:
        # Add flex flex-col h-full if not present
        content = content.replace('group overflow-hidden flex flex-col', 'group overflow-hidden flex flex-col h-full')
        # Add text-justify to p tags in capabilities
        content = content.replace('line-clamp-3\">', 'line-clamp-3 text-justify\">')
        content = content.replace('line-clamp-3\"', 'line-clamp-3 text-justify\"')
        # Add min height to headings
        content = content.replace('text-industrial-900 dark:text-white mb-3', 'text-industrial-900 dark:text-white mb-3 md:min-h-[3.5rem]')
        
    elif filepath == 'about.html':
        # Fix team member cards
        # We need to find the p tags and h3 tags in the team section
        pass # Will do about.html separately or check what it needs
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Updated {filepath}')
