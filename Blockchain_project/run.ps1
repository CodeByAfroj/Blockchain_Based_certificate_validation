param(
    [string]$VenvPath = ".venv",
    [int]$Port = 8000
)

# Create venv if missing
if (-not (Test-Path $VenvPath)) {
    python -m venv $VenvPath
}

# Activate venv for this session
$activate = Join-Path $VenvPath "Scripts\Activate.ps1"
if (Test-Path $activate) {
    . $activate
} else {
    Write-Error "Activation script not found at $activate. Ensure python is installed."
    exit 1
}

# Ensure pip is up to date and install requirements
python -m pip install --upgrade pip
pip install -r .\requirements.txt

# Install frontend npm dependencies (if frontend folder exists and npm is available)
if (Test-Path ".\frontend") {
    if (Get-Command npm -ErrorAction SilentlyContinue) {
        Write-Output "Installing frontend npm packages..."
        npm --prefix .\frontend install
        # Ensure @heroicons/react is installed (install if missing)
        $heroPath = Join-Path (Resolve-Path ".\frontend\node_modules") "@heroicons\react"
        if (-not (Test-Path $heroPath)) {
            Write-Output "Installing @heroicons/react..."
            npm --prefix .\frontend install @heroicons/react
        }
    } else {
        Write-Warning "npm not found; skipping frontend dependency install. Install Node.js and run 'npm install' in the frontend folder manually."
    }
}

# locate manage.py (project root or cert_gen folder)
if (Test-Path ".\manage.py") {
    $managePath = ".\manage.py"
} elseif (Test-Path ".\cert_gen\manage.py") {
    $managePath = ".\cert_gen\manage.py"
} else {
    Write-Error "manage.py not found in project root or .\cert_gen\. Run this script from the project root: d:\Test Block Projects\Blockchain_project"
    exit 1
}

# Run migrations and start server
python $managePath migrate --noinput
Write-Output "Starting Django dev server on port $Port (manage: $managePath)"
python $managePath runserver 0.0.0.0:$Port
