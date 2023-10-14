rm -r ./artifacts/tsout
rm artifacts/lambda_function_payload.zip


cd lambda-src
npx tsc 
cd ..
cd artifacts/tsout
zip -r ../lambda_function_payload.zip  ./  # -x test/

cd ../../terraform
terraform apply -auto-approve
# cd ../webpage-src/summit 
# npm run build
# aws s3 cp --recursive build s3://summit-tournament-webhost-bucket

