cd build
call az storage copy --account-key SWhDOW6+rAmzrVBzMA4D7qFjA4Ry4Ld956sbupvF6USpvdkp7xeWaVMTZ22gVTiFvfWamxSVAe2F+AStgm+dHg== -s *.* -d https://web3static.blob.core.windows.net/$web --recursive
echo "done 1"
call az storage copy --account-key SWhDOW6+rAmzrVBzMA4D7qFjA4Ry4Ld956sbupvF6USpvdkp7xeWaVMTZ22gVTiFvfWamxSVAe2F+AStgm+dHg== -s static -d https://web3static.blob.core.windows.net/$web --recursive 
echo "done 2"