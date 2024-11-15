import subprocess
import boto3
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
import zipfile

from build import build


def zip_directory(directory_path, zip_path):
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(directory_path):
            for file in files:
                file_path = os.path.join(root, file)
                zipf.write(file_path, os.path.relpath(
                    file_path, directory_path))


def main():
    # Load environment variables
    load_dotenv('.env.local')

    # AWS credentials from .env.local
    AWS_KEY_ID = os.getenv('ZIMO_WEB_AWS_KEY_ID')
    AWS_SECRET_KEY = os.getenv('ZIMO_WEB_AWS_SECRET_KEY')

    # S3 bucket details
    BUCKET_NAME = 'zimo-web-theme-maker-spa'
    BUCKET_REGION = 'us-east-2'

    try:
        build()
        print("Shell script executed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error executing shell script: {e}")
        exit(1)

    for root, dirs, files in os.walk('./out'):
        for file in files:
            if file.endswith(('.DS_Store', '.env.local')):
                os.remove(os.path.join(root, file))
                print(f"Deleted garbage file: {os.path.join(root, file)}")

    # Initialize boto3 S3 client
    s3_client = boto3.client(
        's3',
        region_name=BUCKET_REGION,
        aws_access_key_id=AWS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_KEY
    )

    # Create index.html content
    update_time = (datetime.now(timezone.utc) +
                   timedelta(minutes=1)).strftime('%Y-%m-%d %H:%M:%S UTC')

    index_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Under Maintenance</title>
</head>
<body>
    <h1>This website is currently being updated via an automated script.</h1>
    <p>Please check back and refresh the webpage by {update_time}. The actual completion might be sooner.</p>
    <p>Thank you for your patience.</p>
</body>
</html>
"""

    # Write index.html to a file
    index_path = 'placeholder-index.html'
    with open(index_path, 'w') as file:
        file.write(index_content)

    # Upload index.html to the S3 bucket root
    s3_client.upload_file(index_path, BUCKET_NAME, 'index.html',
                          ExtraArgs={'ContentType': 'text/html'})
    print("Placeholder index.html uploaded to S3 bucket.")

    # List and delete all objects in the S3 bucket except index.html
    objects_to_delete = s3_client.list_objects_v2(Bucket=BUCKET_NAME)
    delete_keys = []
    if 'Contents' in objects_to_delete:
        for obj in objects_to_delete['Contents']:
            if obj['Key'] != 'index.html':
                delete_keys.append({'Key': obj['Key']})

    if delete_keys:
        s3_client.delete_objects(
            Bucket=BUCKET_NAME,
            Delete={'Objects': delete_keys}
        )
        print("Deleted all objects in the S3 bucket except index.html.")

    # Create a zip file of the ./out directory
    zip_path = '_temp_build_to_upload.zip'
    zip_directory('./out', zip_path)

    # Upload the zip file to the S3 bucket
    s3_client.upload_file(zip_path, BUCKET_NAME, 'out.zip')
    print("out.zip uploaded to S3 bucket.")

    # Remove the local zip file
    os.remove(zip_path)
    os.remove(index_path)
    print(f"Deleted local zip file: {zip_path}")

    print("Script execution completed.")


if __name__ == '__main__':
    main()
