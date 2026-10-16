import re

def test_script_logic():
    with open('script.js', 'r', encoding='utf-8') as f:
        js = f.read()
    
    print("Checking script.js...")
    # Check if all selectors are present
    assert '#theme-toggle' in js
    assert '#mobile-theme-toggle' in js
    assert '.theme-toggle-btn' in js
    print("Selectors present in script.js.")

test_script_logic()
