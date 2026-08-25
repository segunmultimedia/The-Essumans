Add-Type -AssemblyName System.Drawing
foreach ($file in @('f1.jpg','f2.jpg','f3.jpg','f4.jpg','f5.jpg','f6.jpg')) {
    $path = [System.IO.Path]::Combine((Get-Location).Path, "public\gallery\$file")
    if (Test-Path $path) {
        $img = [System.Drawing.Image]::FromFile($path)
        Write-Host "$file : $($img.Width)x$($img.Height)"
        $img.Dispose()
    }
}
