# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar TODOS os arquivos .csproj
COPY ["psidly-backend/psidly-backend.csproj", "psidly-backend/"]
COPY ["Psidly.Shared.Data/Psidly.Shared.Data.csproj", "Psidly.Shared.Data/"]
COPY ["Psidly.Shared.Models/Psidly.Shared.Models.csproj", "Psidly.Shared.Models/"]

# Restaurar dependências
RUN dotnet restore "psidly-backend/psidly-backend.csproj"

# Copiar TODO o código fonte
COPY . .

# Build
WORKDIR /src/psidly-backend
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