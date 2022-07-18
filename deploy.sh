echo "copying"

cd build
az storage copy --account-key SWhDOW6+rAmzrVBzMA4D7qFjA4Ry4Ld956sbupvF6USpvdkp7xeWaVMTZ22gVTiFvfWamxSVAe2F+AStgm+dHg== -s *.* -d https://web3static.blob.core.windows.net/$web



