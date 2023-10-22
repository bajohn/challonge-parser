# Clean out last deployment
rm -r ./lambda-src/artifacts/tsout
rm lambda-src/artifacts/lambda_function_payload.zip

# Upload lambda code 
cd lambda-src
npx tsc 
cd artifacts/tsout
zip -r ../lambda_function_payload.zip  ./  # -x test/

# Update Terraform, which updates API
cd ../../../terraform
terraform apply -auto-approve

# Update front end
cd ../webpage-src/summit 
npm run build
aws s3 cp --recursive build s3://summit-tournament-webhost-bucket

