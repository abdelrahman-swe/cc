import os
import shutil
import re

workspace_dir = r"c:\Users\Azza\Documents\Codex\2026-06-25\figma-plugin-figma-openai-curated-remote"
public_dir = os.path.join(workspace_dir, "public")
src_dir = os.path.join(workspace_dir, "src")

# 1. Define moves
# Move folders to assets/
assets_dest = os.path.join(public_dir, "assets")
os.makedirs(assets_dest, exist_ok=True)

to_assets = ["icons", "images", "mockups", "partners"]
for folder in to_assets:
    src_path = os.path.join(public_dir, folder)
    dest_path = os.path.join(assets_dest, folder)
    if os.path.exists(src_path):
        print(f"Moving {src_path} -> {dest_path}")
        if os.path.exists(dest_path):
            shutil.rmtree(dest_path)
        shutil.move(src_path, dest_path)

# Move root files to assets/
root_files_to_assets = ["Logo.svg", "footer-logo.svg", "favicon.svg", "hero-blur.svg"]
for file_name in root_files_to_assets:
    src_path = os.path.join(public_dir, file_name)
    dest_path = os.path.join(assets_dest, file_name)
    if os.path.exists(src_path):
        print(f"Moving {src_path} -> {dest_path}")
        shutil.move(src_path, dest_path)

# Move folders to _originals/
originals_dest = os.path.join(public_dir, "_originals")
os.makedirs(originals_dest, exist_ok=True)

to_originals = ["planets", "videos", "work", "lead", "projects", "services"]
for folder in to_originals:
    src_path = os.path.join(public_dir, folder)
    dest_path = os.path.join(originals_dest, folder)
    if os.path.exists(src_path):
        print(f"Moving {src_path} -> {dest_path}")
        if os.path.exists(dest_path):
            shutil.rmtree(dest_path)
        shutil.move(src_path, dest_path)

# Move root footer.svg to _originals/
src_footer = os.path.join(public_dir, "footer.svg")
dest_footer = os.path.join(originals_dest, "footer.svg")
if os.path.exists(src_footer):
    print(f"Moving {src_footer} -> {dest_footer}")
    shutil.move(src_footer, dest_footer)

# 2. Find and replace in src/
# Replace patterns in all .ts, .tsx, .css, .json files
replacements = [
    (r'"/icons/', r'"/assets/icons/'),
    (r"'/icons/", r"'/assets/icons/"),
    (r'"/images/', r'"/assets/images/'),
    (r"'/images/", r"'/assets/images/"),
    (r'"/mockups/', r'"/assets/mockups/'),
    (r"'/mockups/", r"'/assets/mockups/"),
    (r'"/partners/', r'"/assets/partners/'),
    (r"'/partners/", r"'/assets/partners/'),
    
    (r'"/Logo.svg"', r'"/assets/Logo.svg"'),
    (r"'/Logo.svg'", r"'/assets/Logo.svg'"),
    (r'"/footer-logo.svg"', r'"/assets/footer-logo.svg"'),
    (r"'/footer-logo.svg'", r"'/assets/footer-logo.svg'"),
    (r'"/favicon.svg"', r'"/assets/favicon.svg"'),
    (r"'/favicon.svg'", r"'/assets/favicon.svg'"),
    (r'"/hero-blur.svg"', r'"/assets/hero-blur.svg"'),
    (r"'/hero-blur.svg'", r"'/assets/hero-blur.svg'"),
]

def apply_replacements(content):
    modified = False
    for pattern, repl in replacements:
        new_content, count = re.subn(pattern, repl, content)
        if count > 0:
            content = new_content
            modified = True
    return content, modified

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.css', '.json')):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                new_content, modified = apply_replacements(content)
                if modified:
                    print(f"Updating references in {file_path}")
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
            except Exception as e:
                print(f"Error processing {file_path}: {e}")

print("Reorganization completed!")
