## Download files from Bluemix Object Storage

Usage:
```
 $ git clone https://github.com/ibm-watson-data-lab/simple-bmos-downloader.git
 $ cd simple-bmos-downloader
 $ export PROJECT_ID=<bluemix_object_storage_project_id>
 $ export USER_ID=<bluemix_object_storage_user_id>
 $ export PASSWORD=<bluemix_object_storage_password>
 $ export REGION=<bluemix_object_storage_region>
 $ node download <os_container_name> <os_object_name>
```

You can also create a `.env` file in the simple-bmos-downloader directory to set the environment variables:
```
PROJECT_ID=<bluemix_object_storage_project_id>
USER_ID=<bluemix_object_storage_user_id>
PASSWORD=<bluemix_object_storage_password>
REGION=<bluemix_object_storage_region>
```
