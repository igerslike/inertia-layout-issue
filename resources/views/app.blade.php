@php
/*
 * Conditionally set node port based on node environment in .env file
 * Corresponds to the ports set to listen in ssr.js
 *
 * @author Finna Create
 */
$port = env('MIX_NODE_ENV') === 'Production' ? 8080 : 5000;

try {
    $ssr = Http::post('http://localhost:' . $port . '/render', $page)
        ->throw()
        ->json();
} catch (Exception $e) {
    $ssr = null;
}

@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Fonts --}}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap">

    {{-- Styles --}}
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    {{-- Scripts --}}
    <script src="{{ mix('js/manifest.js') }}" defer></script>
    <script src="{{ mix('js/vendor.js') }}" defer></script>
    <script src="{{ mix('js/app.js') }}" defer></script>

    {{-- Icon --}}
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="apple-touch-icon" href="{{ asset('favicon.ico') }}">
    <meta name="msapplication-TileImage" content="{{ asset('favicon.ico') }}">

    <meta name="apple-mobile-web-app-capable" content="yes">

    @foreach ($ssr['head'] ?? [] as $element)
        {!! $element !!}
    @endforeach
</head>

{{-- Render theme class with fallback for ssr ($theme gets cookie in AppServiceProvider) --}}
{{-- @author Finna Create <finnacreate@gmail.com> --}}

<body class="font-sans antialiased {{ $theme ?? 'light-theme' }}">
    {{-- @dd($ssr) --}}
    @if ($ssr)
        {!! $ssr['body'] !!}
    @else
        @inertia
    @endif

    @env('local')
    <script src="https://apple.loc:3000/browser-sync/browser-sync-client.js"></script>
    {{-- <script src="https://localhost:3000/browser-sync/browser-sync-client.js"></script> --}}
    @endenv
</body>

</html>
