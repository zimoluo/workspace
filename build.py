import os
import subprocess
import sys
import shutil

REDUNDANT_ASSETS = [
    '/util/wikipedia-logo.svg',
    '/theme/animated-background/bewitched/full.svg',
    '/theme/animated-background/bewitched/crescent.svg',
    '/theme/animated-background/birthday/eighteen.svg',
    '/theme/animated-background/birthday/static-balloon.svg',
    '/theme/animated-background/birthday19/nineteen.svg',
    '/theme/animated-background/birthday19/colors.svg',
    '/theme/animated-background/blog/eunoe-text.svg',
    '/theme/animated-background/blog/base-glow.svg',
    '/theme/animated-background/blog/base-orb.svg',
    '/theme/animated-background/bubbles/moving.svg',
    '/theme/animated-background/bubbles/static.svg',
    '/theme/animated-background/crimson/tower.svg',
    '/theme/animated-background/crimson/fan.svg',
    '/theme/animated-background/grass/bg.svg',
    '/theme/animated-background/halloween/graveyard.svg',
    '/theme/animated-background/halloween/castle.svg',
    '/theme/animated-background/halloween/wood.svg',
    '/theme/animated-background/halloween/moon.svg',
    '/theme/animated-background/halloween/pumpkins.svg',
    '/theme/animated-background/halloween/bats.svg',
    '/theme/animated-background/home/moving-1.svg',
    '/theme/animated-background/home/moving-2.svg',
    '/theme/animated-background/home/moving-3.svg',
    '/theme/animated-background/memories/nodes.svg',
    '/theme/animated-background/perpetuity/moving-blocks.svg',
    '/theme/animated-background/perpetuity/moving-blocks-static.svg',
    '/theme/animated-background/photos/zimo-wall.svg',
    '/theme/animated-background/photos/circle.svg',
    '/theme/animated-background/photos/squircle.svg',
    '/theme/animated-background/photos/filled.svg',
    '/theme/animated-background/projects/cog-yang.svg',
    '/theme/animated-background/projects/cog-yin.svg',
    '/theme/animated-background/storm/eye-1.svg',
    '/theme/animated-background/storm/eye-2.svg',
    '/theme/animated-background/storm/eye-3.svg',
]


def clean_redundant_assets(public_dir):
    """Delete redundant assets from the public directory."""
    for asset in REDUNDANT_ASSETS:
        asset_path = os.path.join(
            public_dir, asset.lstrip('/').replace('/', os.sep))
        if os.path.exists(asset_path):
            try:
                print(f"Deleting redundant asset: {asset_path}")
                os.remove(asset_path)
            except Exception as e:
                print(f"Failed to delete {asset_path}: {e}")


def remove_empty_dirs(directory):
    """Recursively remove empty directories."""
    for dirpath, dirnames, filenames in os.walk(directory, topdown=False):
        for dirname in dirnames:
            dir_to_check = os.path.join(dirpath, dirname)
            if not os.listdir(dir_to_check):
                try:
                    print(f"Removing empty directory: {dir_to_check}")
                    os.rmdir(dir_to_check)
                except Exception as e:
                    print(f"Failed to remove {dir_to_check}: {e}")


def build():
    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.realpath(__file__))

    # Check if the current working directory matches the script directory
    if os.getcwd() != script_dir:
        print("Error: Script is not running in the intended directory.")
        print(f"Current directory: {os.getcwd()}")
        print(f"Expected directory: {script_dir}")
        sys.exit(1)

    # Run npm install
    try:
        print("Running 'npm install'...")
        subprocess.check_call(['npm', 'install'])
        print("npm install completed successfully.")
    except subprocess.CalledProcessError:
        print("npm install failed. Aborting.")
        sys.exit(1)

    # Remove the ./out directory
    out_dir = os.path.join(script_dir, 'out')
    if os.path.exists(out_dir):
        print(f"Removing directory: {out_dir}")
        shutil.rmtree(out_dir)

    # Run npm run build
    try:
        print("Running 'npm run build'...")
        subprocess.check_call(['npm', 'run', 'build'])
    except subprocess.CalledProcessError:
        print("npm run build failed. Aborting.")
        sys.exit(1)

    # Delete redundant assets
    if os.path.exists(out_dir):
        clean_redundant_assets(out_dir)
    else:
        print(f"Assets directory does not exist: {out_dir}")

    if os.path.exists(out_dir):
        remove_empty_dirs(out_dir)


if __name__ == "__main__":
    build()
