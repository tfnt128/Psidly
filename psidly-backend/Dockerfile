# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar o .csproj e restaurar dependências
COPY ["psidly-backend/psidly-backend.csproj", "psidly-backend/"]
RUN dotnet restore "psidly-backend/psidly-backend.csproj"

# Copiar todo o código
COPY psidly-backend/ psidly-backend/
WORKDIR /src/psidly-backend

# Build
RUN dotnet build "psidly-backend.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "psidly-backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "psidly-backend.dll"]