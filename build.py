import os
import subprocess
import sys


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
        subprocess.run(['rm', '-rf', './out'], check=True)

    # Run npm run build
    try:
        print("Running 'npm run build'...")
        subprocess.check_call(['npm', 'run', 'build'])
    except subprocess.CalledProcessError:
        print("npm run build failed. Aborting.")
        sys.exit(1)


if __name__ == "__main__":
    build()
