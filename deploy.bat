cd build
call az storage copy --account-key $key -s *.* -d https://web3static.blob.core.windows.net/$web --recursive
echo "done 1"
call az storage copy --account-key $key -s static -d https://web3static.blob.core.windows.net/$web --recursive 
echo "done 2"
