import glob

with open('about.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Update Vision and Mission cards
old_vision = 'class="bg-industrial-800/50 p-10 rounded-xl border border-industrial-700/50 relative overflow-hidden group hover:border-accent-500/30 transition-colors duration-300"'
new_vision = 'class="bg-industrial-800/50 p-10 rounded-xl border border-industrial-700/50 relative overflow-hidden group hover:border-accent-500/30 transition-colors duration-300 flex flex-col h-full"'
content = content.replace(old_vision, new_vision)

old_mission_p = 'class="text-industrial-300 text-lg leading-relaxed"'
new_mission_p = 'class="text-industrial-300 text-lg leading-relaxed flex-grow text-justify"'
content = content.replace(old_mission_p, new_mission_p)

# Update Team cards
old_team_card = 'class="bg-white dark:bg-industrial-800 rounded-lg shadow-md p-8 text-center border border-gray-100 dark:border-industrial-700 hover:shadow-lg transition-shadow"'
new_team_card = 'class="bg-white dark:bg-industrial-800 rounded-lg shadow-md p-8 text-center border border-gray-100 dark:border-industrial-700 hover:shadow-lg transition-shadow flex flex-col h-full"'
content = content.replace(old_team_card, new_team_card)

# Add flex-grow to the last paragraph in team cards so they stretch and bottom aligns evenly
old_team_p = 'class="text-industrial-600 dark:text-industrial-400 text-sm"'
new_team_p = 'class="text-industrial-600 dark:text-industrial-400 text-sm flex-grow text-justify"'
content = content.replace(old_team_p, new_team_p)

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated about.html")
