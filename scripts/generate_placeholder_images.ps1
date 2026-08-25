$folder = Join-Path $PSScriptRoot '..\public\images'
if (-not (Test-Path $folder)) { New-Item -ItemType Directory -Path $folder | Out-Null }
$files = @(
    @{name='field-electric-fence.jpg'; width=1600; height=1067; text='field-electric-fence.jpg'},
    @{name='field-gate-cabling.jpg'; width=1600; height=1067; text='field-gate-cabling.jpg'},
    @{name='field-technician-work.jpg'; width=1600; height=1067; text='field-technician-work.jpg'},
    @{name='field-cctv-mount.jpg'; width=1600; height=1067; text='field-cctv-mount.jpg'},
    @{name='og-cover.jpg'; width=1200; height=630; text='og-cover.jpg'}
)

Add-Type -AssemblyName System.Drawing

foreach ($item in $files) {
    $bmp = New-Object System.Drawing.Bitmap($item.width, $item.height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::FromArgb(91,91,91))
    $font = New-Object System.Drawing.Font('Arial', 32)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $size = $g.MeasureString($item.text, $font)
    $x = ($item.width - $size.Width) / 2
    $y = ($item.height - $size.Height) / 2
    $g.DrawString($item.text, $font, $brush, $x, $y)
    $path = Join-Path $folder $item.name
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
    $font.Dispose()
    $brush.Dispose()
    Write-Host "Created $path"
}
