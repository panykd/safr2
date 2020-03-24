FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build

WORKDIR /app

## Copy the require project files
COPY *.csproj ./

# Run Restore to download the nuget packages
RUN dotnet restore

# Copy the rest of the files
COPY . ./

# Create the Deployment
RUN dotnet publish -c Release -o /dist

# Runtime
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

EXPOSE 80

WORKDIR /app
COPY --from=build /dist .
ENTRYPOINT ["dotnet", "Api.Kestrel.dll"]