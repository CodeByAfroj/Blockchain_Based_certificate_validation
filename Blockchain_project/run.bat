@echo off
set VENV=.venv

if not exist "%VENV%\Scripts\python.exe" (
    python -m venv "%VENV%"
)

call "%VENV%\Scripts\activate.bat"

python -m pip install --upgrade pip
pip install -r requirements.txt

:: Install frontend npm packages if frontend exists and npm is available
if exist ".\frontend\package.json" (
    where npm >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo Installing frontend npm packages...
        pushd frontend
        npm install
        :: install heroicons if missing
        npm list @heroicons/react >nul 2>&1 || npm install @heroicons/react
        popd
    ) else (
        echo npm not found, skipping frontend npm install. Install Node.js and run npm install in the frontend folder manually.
    )
)

python manage.py migrate --noinput
echo Starting Django dev server on port 8000
python manage.py runserver 0.0.0.0:8000