# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0-nanoserver-1809 AS build
WORKDIR /src

# Copiar o .csproj e restaurar dependências
COPY ["psidly-backend.csproj", "./"]
RUN dotnet restore "psidly-backend.csproj"

# Copiar todo o código
COPY . .

# Build
RUN dotnet build "psidly-backend.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "psidly-backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0-nanoserver-1809 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "psidly-backend.dll"]