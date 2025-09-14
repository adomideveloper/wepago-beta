<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wepago - Dashboard para Comercios</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Flatpickr Datepicker CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://npmcdn.com/flatpickr/dist/plugins/monthSelect/style.css">


    <style>
        /* Aplicar la fuente Inter a todo el cuerpo del documento */
        body {
            font-family: 'Inter', sans-serif;
            -webkit-tap-highlight-color: transparent;
            background-color: #f1f5f9; /* slate-100 */
        }
        html {
            scroll-behavior: smooth;
        }
        /* Estilos para Modales */
        .modal-container {
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .modal-container.visible {
            visibility: visible;
            opacity: 1;
        }

        /* Estilos personalizados para Flatpickr */
        .flatpickr-calendar {
            font-family: 'Inter', sans-serif;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            border: 1px solid #e2e8f0; /* slate-200 */
        }
        .flatpickr-month, .flatpickr-current-month {
            font-size: 1rem;
            font-weight: 600;
        }
        span.flatpickr-day.selected, span.flatpickr-day.selected:hover {
            background: #1e3a8a; /* blue-800 */
            border-color: #1e3a8a;
        }
        
        /* Estilos para la Notificación Toast */
        #notificationToast {
            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
            transform: translateY(100%);
            opacity: 0;
        }
        #notificationToast.show {
            transform: translateY(0);
            opacity: 1;
        }

        /* Animación para la campana de notificaciones */
        @keyframes ring {
            0%, 100% { transform: rotate(0); }
            10%, 30%, 50%, 70%, 90% { transform: rotate(-5deg); }
            20%, 40%, 60%, 80% { transform: rotate(5deg); }
        }
        .animate-ring {
            animation: ring 2s ease-in-out infinite;
            animation-delay: 3s;
            transform-origin: top center;
        }
        /* Sombra personalizada para tarjetas */
        .soft-shadow {
             box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
        }
    </style>
</head>
<body class="bg-slate-100">

    <div class="max-w-md mx-auto min-h-screen bg-slate-50">

        <!-- ========= Vista del Dashboard (Principal) ========= -->
        <div id="dashboardView">
            <div class="p-5 pb-28">
                <!-- Cabecera -->
                <header class="mb-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="font-bold text-slate-800 text-2xl tracking-tight">Hola, Rizos Dorados</h1>
                            <p class="text-slate-500 text-sm">Bienvenido a tu panel de control</p>
                        </div>
                        <div class="relative">
                            <button id="notificationBellBtn" class="relative w-11 h-11 flex-shrink-0 flex items-center justify-center bg-white rounded-full text-slate-500 border border-slate-200 soft-shadow">
                                <svg id="bellIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                <span class="absolute top-2 right-2.5 block w-2 h-2 bg-blue-600 rounded-full"></span>
                            </button>
                             <div id="notificationsDropdown" class="hidden absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden z-10">
                                <div class="p-3">
                                    <h3 class="font-bold text-slate-800 px-2">Notificaciones</h3>
                                </div>
                                <div class="divide-y divide-slate-100">
                                    <a href="#" class="flex items-start space-x-3 p-3 hover:bg-slate-50 transition-colors">
                                        <div class="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                        </div>
                                        <div>
                                            <p class="font-semibold text-sm text-slate-800">Nuevo Ingreso de Dinero</p>
                                            <p class="text-xs text-slate-500 mt-0.5">Recibiste <span class="font-bold">$50,000</span> de user_ana_g.</p>
                                        </div>
                                    </a>
                                    <a href="#" class="flex items-start space-x-3 p-3 hover:bg-slate-50 transition-colors">
                                        <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </div>
                                        <div>
                                            <p class="font-semibold text-sm text-slate-800">¡Bienvenido a Wepago!</p>
                                            <p class="text-xs text-slate-500 mt-0.5">Gestiona tus cobros de forma fácil y segura.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center mt-4">
                        <img src="https://txen.nyc3.cdn.digitaloceanspaces.com/clientes/wepago/wepago-app-1.png" alt="Logo Wepago" class="h-10">
                    </div>
                </header>

                <!-- Tarjeta de Balance Principal -->
                <section class="p-6 rounded-2xl bg-slate-800 text-white shadow-xl shadow-slate-800/20">
                    <p class="text-sm opacity-70">Dinero Recibido (Hoy)</p>
                    <p id="todaysBalance" class="text-4xl font-bold tracking-tight mt-2">$0,00</p>
                    <div class="mt-6 grid grid-cols-2 gap-3">
                        <button id="openModalBtn" class="w-full flex items-center justify-center space-x-2 bg-white text-slate-800 rounded-xl px-4 py-3 text-base font-bold transition-all transform hover:scale-105 active:scale-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            <span>Crear Cobro</span>
                        </button>
                        <button id="myKeyBtn" class="w-full flex items-center justify-center space-x-2 bg-white/20 text-white rounded-xl px-4 py-3 text-base font-bold transition-all transform hover:scale-105 active:scale-100">
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h4v4H4zM16 4h4v4h-4zM4 16h4v4H4zM16 16h4v4h-4zM10 4h4v4h-4zM10 16h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4z"/></svg>
                            <span>Mi Llave</span>
                        </button>
                    </div>
                </section>
                
                <!-- Sección de Acciones Rápidas -->
                <section class="mt-8">
                    <h2 class="font-bold text-slate-800 text-lg mb-3">Gestión Rápida</h2>
                    <div class="grid grid-cols-2 gap-4">
                        <a href="#" id="cobrosQuickBtn" class="flex items-center space-x-3 p-4 bg-white rounded-2xl soft-shadow"><div class="bg-blue-100 text-blue-600 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg></div><div><p class="font-semibold text-slate-700">Cobros</p><p class="text-xs text-slate-500">Historial</p></div></a>
                        <a href="#" id="statsQuickBtn" class="flex items-center space-x-3 p-4 bg-white rounded-2xl soft-shadow"><div class="bg-blue-100 text-blue-600 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg></div><div><p class="font-semibold text-slate-700">Estadísticas</p><p class="text-xs text-slate-500">Rendimiento</p></div></a>
                        <a href="#" id="clientsQuickBtn" class="flex items-center space-x-3 p-4 bg-white rounded-2xl soft-shadow"><div class="bg-blue-100 text-blue-600 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div><div><p class="font-semibold text-slate-700">Clientes</p><p class="text-xs text-slate-500">Directorio</p></div></a>
                        <a href="#" id="settingsQuickBtn" class="flex items-center space-x-3 p-4 bg-white rounded-2xl soft-shadow"><div class="bg-blue-100 text-blue-600 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg></div><div><p class="font-semibold text-slate-700">Ajustes</p><p class="text-xs text-slate-500">Configuración</p></div></a>
                    </div>
                </section>
                
                <!-- Historial de Cobros Recientes -->
                <section class="mt-8">
                    <div class="flex justify-between items-center mb-3">
                        <h2 class="font-bold text-slate-800 text-lg">Cobros Recientes</h2>
                        <a href="#" id="verTodoBtn" class="text-blue-600 font-semibold text-sm">Ver todo</a>
                    </div>
                    <div id="chargesContainer" class="space-y-2">
                        <div id="noChargesMessage" class="hidden text-center py-10 px-6 bg-white rounded-2xl soft-shadow">
                            <p class="text-slate-500">Aquí verás tus últimos cobros.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <!-- ========= Vista de Mi Llave (QR) ========= -->
        <div id="myKeyView" class="hidden">
             <div class="p-5 pb-28">
                <header class="relative flex justify-center items-center mb-8">
                    <button id="backToDashboardBtnKey" class="absolute left-0 w-11 h-11 flex items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-full soft-shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <h1 class="font-bold text-slate-800 text-xl text-center">Mi Llave Principal</h1>
                </header>
                <main class="flex flex-col items-center justify-center text-center mt-8">
                    <div id="qrcodeContainer" class="p-4 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50">
                        <!-- QR Code will be generated here -->
                    </div>
                    <p class="mt-6 text-slate-800 font-mono text-2xl tracking-widest bg-slate-200 px-4 py-2 rounded-lg">SBRD7805</p>
                     <p class="mt-4 text-slate-500 max-w-xs">Presenta este QR para que tus clientes puedan identificarte y pagarte rápidamente.</p>
                </main>
            </div>
        </div>

        <!-- ========= Vista del Historial de Cobros ========= -->
        <div id="historyView" class="hidden">
             <div class="p-5 pb-28">
                <header class="relative flex justify-center items-center mb-8">
                    <button id="backToDashboardBtnHistory" class="absolute left-0 w-11 h-11 flex items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-full soft-shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <h1 class="font-bold text-slate-800 text-xl text-center">Cobros</h1>
                </header>

                <!-- Cobros Masivos -->
                <section class="mb-6">
                    <h2 class="text-base font-bold text-slate-700 mb-3">Cobros Masivos</h2>
                    <div class="grid grid-cols-2 gap-3">
                         <button id="downloadTemplateBtn" class="w-full flex items-center justify-center space-x-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>
                            <span>Plantilla</span>
                        </button>
                        <label for="importExcelInput" class="cursor-pointer w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 1.854a.5.5 0 0 0 .708 0l3 3a.5.5 0 0 0-.708.708L8.5 3.707V12.5a.5.5 0 0 0 1 0V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3z"/></svg>
                            <span>Importar</span>
                        </label>
                        <input type="file" id="importExcelInput" class="hidden" accept=".xlsx, .xls">
                    </div>
                </section>

                <main>
                    <h2 class="text-base font-bold text-slate-700 mb-3">Historial de Cobros</h2>
                    <!-- Filtros -->
                    <section id="filters" class="mb-4">
                        <div class="mb-4">
                             <div class="relative">
                                <input type="text" id="monthFilter" placeholder="Seleccionar mes..." class="cursor-pointer block w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold pr-10 bg-white">
                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg class="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                </div>
                            </div>
                        </div>
                         <div id="statusFilterContainer" class="grid grid-cols-2 sm:grid-cols-4 items-center justify-between bg-slate-200 rounded-full p-1 text-sm text-center font-semibold gap-1">
                            <button data-status="Todos" class="flex-1 px-3 py-1.5 rounded-full">Todos</button>
                            <button data-status="Recibido" class="flex-1 px-3 py-1.5 rounded-full">Recibido</button>
                            <button data-status="Programado" class="flex-1 px-3 py-1.5 rounded-full">Programado</button>
                            <button data-status="Expirado" class="flex-1 px-3 py-1.5 rounded-full">Expirado</button>
                        </div>
                    </section>
                    
                    <button id="exportExcelBtn" class="mb-4 w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>
                        <span>Exportar a Excel</span>
                    </button>

                    <div id="historyChargesContainer" class="space-y-2">
                        <div id="noHistoryChargesMessage" class="hidden text-center py-10 px-6 bg-white rounded-2xl soft-shadow">
                            <p class="text-slate-500">No hay cobros para los filtros.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        
        <!-- ========= Vista de Clientes ========= -->
        <div id="clientsView" class="hidden">
            <div class="p-5 pb-28">
                <header class="flex justify-between items-center mb-6">
                    <button id="backToDashboardBtnClients" class="w-11 h-11 flex items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-full soft-shadow">
                       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <h1 class="font-bold text-slate-800 text-xl text-center">Clientes</h1>
                    <button id="addClientBtn" class="w-11 h-11 flex items-center justify-center bg-slate-800 text-white rounded-full soft-shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="17" y1="11" x2="23" y2="11"></line></svg>
                    </button>
                </header>
                 <main>
                    <div class="relative mb-4">
                        <input type="text" id="clientSearchInput" placeholder="Buscar cliente..." class="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                             <svg class="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
                        </div>
                    </div>
                    <div id="clientsListContainer" class="space-y-2">
                        <div id="noClientsMessage" class="hidden text-center py-10 px-6 bg-white rounded-2xl soft-shadow">
                            <p class="text-slate-500">No se encontraron clientes.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>

        <!-- ========= Vista de Ajustes ========= -->
        <div id="settingsView" class="hidden">
             <div class="p-5 pb-28">
                <header class="relative flex justify-center items-center mb-8">
                     <button id="backToDashboardBtnSettings" class="absolute left-0 w-11 h-11 flex items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-full soft-shadow">
                       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <h1 class="font-bold text-slate-800 text-xl text-center">Ajustes</h1>
                </header>
                 <main class="space-y-2">
                    <a href="#" id="myKeysLink" class="flex items-center justify-between bg-white p-4 rounded-xl soft-shadow">
                        <div class="flex items-center space-x-4">
                            <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                            </div>
                            <span class="font-semibold text-slate-700">Mis Llaves</span>
                        </div>
                        <svg class="text-slate-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </a>
                    <a href="#" id="paymentMethodsLink" class="flex items-center justify-between bg-white p-4 rounded-xl soft-shadow">
                        <div class="flex items-center space-x-4">
                            <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                            </div>
                            <span class="font-semibold text-slate-700">Metodos de pago</span>
                        </div>
                        <svg class="text-slate-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </a>
                    <a href="#" id="accountsLink" class="flex items-center justify-between bg-white p-4 rounded-xl soft-shadow">
                        <div class="flex items-center space-x-4">
                            <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5"/></svg>
                            </div>
                            <span class="font-semibold text-slate-700">Cuentas</span>
                        </div>
                        <svg class="text-slate-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </a>
                 </main>
            </div>
        </div>
        
        <!-- ========= Vista de Mis Llaves ========= -->
        <div id="myKeysView" class="hidden">
             <div class="p-5 pb-28">
                <header class="flex justify-between items-center mb-8">
                    <button id="backToSettingsBtnKeys" class="w-11 h-11 flex items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-full soft-shadow">
                       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <h1 class="font-bold text-slate-800 text-xl text-center">Mis Llaves</h1>
                    <button id="addKeyBtn" class="w-11 h-11 flex items-center justify-center bg-slate-800 text-white rounded-full soft-shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </header>
                 <main>
                    <div id="keysListContainer" class="space-y-2">
                        <!-- Las llaves se insertarán aquí dinámicamente -->
                    </div>
                 </main>
            </div>
        </div>

        <!-- ========= Vista de Estadísticas ========= -->
        <div id="statisticsView" class="hidden">
             <div class="p-5 pb-28">
                <header class="relative flex justify-center items-center mb-6">
                     <button id="backToDashboardBtnStats" class="absolute left-0 w-11 h-11 flex items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-full soft-shadow">
                       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <h1 class="font-bold text-slate-800 text-xl text-center">Estadísticas</h1>
                </header>
                 <main>
                    <!-- Filtros de periodo -->
                    <section class="mb-6">
                        <div id="statsPeriodFilter" class="grid grid-cols-3 items-center justify-between bg-slate-200 rounded-full p-1 text-sm text-center font-semibold gap-1">
                            <button data-period="today" class="flex-1 px-3 py-1.5 rounded-full bg-slate-800 text-white">Hoy</button>
                            <button data-period="week" class="flex-1 px-3 py-1.5 rounded-full text-slate-600">Semana</button>
                            <button data-period="month" class="flex-1 px-3 py-1.5 rounded-full text-slate-600">Mes</button>
                        </div>
                    </section>

                    <!-- Tarjetas de Stats -->
                    <section class="mb-6 grid grid-cols-2 gap-4">
                        <div class="bg-white p-4 rounded-xl soft-shadow flex items-start space-x-3">
                            <div class="w-10 h-10 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-slate-500">Ingresos</p>
                                <p id="statsTotalRevenue" class="text-xl font-bold text-slate-800 mt-1">$0,00</p>
                            </div>
                        </div>
                         <div class="bg-white p-4 rounded-xl soft-shadow flex items-start space-x-3">
                             <div class="w-10 h-10 bg-green-100 text-green-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-slate-500">Exitosos</p>
                                <p id="statsSuccessfulCharges" class="text-xl font-bold text-slate-800 mt-1">0</p>
                            </div>
                        </div>
                        <div class="col-span-2 bg-white p-4 rounded-xl soft-shadow flex items-start space-x-3">
                             <div class="w-10 h-10 bg-slate-200 text-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-slate-500">Tasa de Éxito</p>
                                <p id="statsSuccessRate" class="text-xl font-bold text-slate-800 mt-1">0%</p>
                            </div>
                        </div>
                    </section>
                    
                    <!-- Gráfica -->
                    <section class="mb-6">
                        <h2 class="font-bold text-slate-800 text-lg mb-4">Resumen de Ingresos</h2>
                        <div class="bg-white p-4 rounded-xl soft-shadow">
                            <canvas id="statsChart"></canvas>
                        </div>
                    </section>

                    <!-- Cliente Principal -->
                    <section>
                         <h2 class="font-bold text-slate-800 text-lg mb-4">Cliente Principal</h2>
                         <div id="statsTopClient" class="bg-white p-4 rounded-xl soft-shadow flex items-center space-x-4">
                             <!-- Contenido dinámico del cliente principal -->
                         </div>
                    </section>
                 </main>
            </div>
        </div>

        <!-- ========= Vista de Métodos de Pago ========= -->
        <div id="paymentMethodsView" class="hidden">
             <div class="p-5 pb-28">
                <header class="flex justify-between items-center mb-8">
                    <button id="backToSettingsBtn" class="w-11 h-11 flex items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-full soft-shadow">
                       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <h1 class="font-bold text-slate-800 text-xl text-center">Métodos de Pago</h1>
                    <button id="editPaymentMethodsBtn" class="text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-2 rounded-full">Editar</button>
                </header>
                 <main>
                    <div id="paymentMethodsList" class="space-y-2">
                        <!-- Los métodos de pago se insertarán aquí dinámicamente -->
                    </div>
                 </main>
            </div>
        </div>

        <!-- ========= Vista de Cuentas Bancarias ========= -->
        <div id="accountsView" class="hidden">
            <div class="p-5 pb-28">
                <header class="flex justify-between items-center mb-8">
                     <button id="backToSettingsBtnAccounts" class="w-11 h-11 flex items-center justify-center text-slate-500 bg-white border border-slate-200 rounded-full soft-shadow">
                       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <h1 class="font-bold text-slate-800 text-xl text-center">Cuentas Bancarias</h1>
                    <button id="addAccountBtn" class="w-11 h-11 flex items-center justify-center bg-slate-800 text-white rounded-full soft-shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </header>
                 <main>
                    <div id="accountsListContainer" class="space-y-2">
                        <!-- Las cuentas se insertarán aquí dinámicamente -->
                    </div>
                 </main>
            </div>
        </div>


        <!-- ========= Barra de Navegación Inferior ========= -->
        <nav class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-sm border-t border-slate-200">
            <div class="flex justify-around items-center px-4 py-3">
                <a href="#" id="inicioNavBtn" class="flex flex-col items-center text-slate-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg><span class="text-xs font-bold">Inicio</span></a>
                <a href="#" id="cobrosNavBtn" class="flex flex-col items-center text-slate-400 hover:text-slate-800 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg><span class="text-xs font-medium">Cobros</span></a>
                <a href="#" id="clientsNavBtn" class="flex flex-col items-center text-slate-400 hover:text-slate-800 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg><span class="text-xs font-medium">Clientes</span></a>
                <a href="#" id="settingsNavBtn" class="flex flex-col items-center text-slate-400 hover:text-slate-800 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg><span class="text-xs font-medium">Ajustes</span></a>
            </div>
        </nav>
        <footer class="text-center pb-28 pt-4">
            <p class="text-xs text-slate-400">Wepago Ver 1.0 Comercios</p>
        </footer>
    </div>

    <!-- ========= Modal para Crear Cobro ========= -->
    <div id="createChargeModal" class="modal-container fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl shadow-lg p-6">
            <h2 class="font-bold text-lg text-slate-800 mb-4">Crear Nuevo Cobro</h2>
            <form id="chargeForm">
                <div class="space-y-4">
                    <div>
                        <label for="userId" class="text-sm font-medium text-slate-600">Ingresar Llave</label>
                        <input type="text" id="userId" name="userId" class="text-base mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" required>
                    </div>
                    <div>
                        <label for="amount" class="text-sm font-medium text-slate-600">Valor a Cobrar</label>
                        <input type="text" id="amount" name="amount" class="text-base mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="0,00" required inputmode="decimal">
                    </div>
                    <div>
                        <label for="scheduledDate" class="text-sm font-medium text-slate-600">Fecha de Cobro (Opcional)</label>
                        <input type="text" id="scheduledDate" name="scheduledDate" class="text-base mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer" placeholder="Inmediato (Hoy)">
                    </div>
                    <div class="flex items-center pt-2">
                        <input type="checkbox" id="markAsReceived" name="markAsReceived" class="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-700">
                        <label for="markAsReceived" class="ml-2 block text-sm text-slate-700">Marcar como Recibido (Prueba)</label>
                    </div>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                    <button type="button" id="cancelBtn" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm">Cancelar</button>
                    <button type="submit" class="px-5 py-2 bg-slate-800 text-white rounded-lg font-semibold text-sm">Enviar Cobro</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- ========= Modal para Añadir Cliente ========= -->
    <div id="addClientModal" class="modal-container fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl shadow-lg p-6">
            <h2 class="font-bold text-lg text-slate-800 mb-4">Añadir Nuevo Cliente</h2>
            <form id="addClientForm">
                <div class="space-y-4">
                    <div>
                        <label for="clientName" class="text-sm font-medium text-slate-600">Nombre del Cliente</label>
                        <input type="text" id="clientName" name="clientName" class="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" required>
                    </div>
                    <div>
                        <label for="clientUserId" class="text-sm font-medium text-slate-600">ID del Usuario</label>
                        <input type="text" id="clientUserId" name="clientUserId" class="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" required>
                    </div>
                     <div>
                        <label for="clientPhone" class="text-sm font-medium text-slate-600">Número de Teléfono</label>
                        <input type="tel" id="clientPhone" name="clientPhone" class="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" required>
                    </div>
                    <div>
                        <label for="clientRegistrationNumber" class="text-sm font-medium text-slate-600">Número de Registro</label>
                        <input type="text" id="clientRegistrationNumber" name="clientRegistrationNumber" class="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    </div>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                    <button type="button" id="cancelAddClientBtn" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm">Cancelar</button>
                    <button type="submit" class="px-5 py-2 bg-slate-800 text-white rounded-lg font-semibold text-sm">Guardar Cliente</button>
                </div>
            </form>
        </div>
    </div>

    <!-- ========= Modal para Añadir Cuenta Bancaria ========= -->
    <div id="addAccountModal" class="modal-container fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl shadow-lg p-6">
            <h2 class="font-bold text-lg text-slate-800 mb-4">Añadir Nueva Cuenta</h2>
            <form id="addAccountForm">
                <div class="space-y-4">
                    <div>
                        <label for="accountName" class="text-sm font-medium text-slate-600">Nombre de la Cuenta</label>
                        <input type="text" id="accountName" name="accountName" class="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" required>
                    </div>
                    <div>
                        <label for="accountNumber" class="text-sm font-medium text-slate-600">Número de Cuenta</label>
                        <input type="text" id="accountNumber" name="accountNumber" class="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" required>
                    </div>
                     <div>
                        <label for="accountType" class="text-sm font-medium text-slate-600">Tipo de Cuenta</label>
                        <select id="accountType" name="accountType" class="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white" required>
                            <option>Ahorros</option>
                            <option>Corriente</option>
                        </select>
                    </div>
                    <div>
                        <label for="bankName" class="text-sm font-medium text-slate-600">Banco</label>
                        <input type="text" id="bankName" name="bankName" class="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" required>
                    </div>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                    <button type="button" id="cancelAddAccountBtn" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm">Cancelar</button>
                    <button type="submit" class="px-5 py-2 bg-slate-800 text-white rounded-lg font-semibold text-sm">Guardar Cuenta</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- ========= Modal para Añadir Llave ========= -->
    <div id="addKeyModal" class="modal-container fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl shadow-lg p-6">
            <h2 class="font-bold text-lg text-slate-800 mb-4">Crear Nueva Llave</h2>
            <form id="addKeyForm">
                <div class="space-y-4">
                    <div>
                        <label for="newKeyInput" class="text-sm font-medium text-slate-600">Código de la Llave</label>
                        <input type="text" id="newKeyInput" name="newKeyInput" class="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" minlength="5" required>
                        <p class="text-xs text-slate-500 mt-1">Mínimo 5 caracteres alfanuméricos.</p>
                    </div>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                    <button type="button" id="cancelAddKeyBtn" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm">Cancelar</button>
                    <button type="submit" class="px-5 py-2 bg-slate-800 text-white rounded-lg font-semibold text-sm">Guardar Llave</button>
                </div>
            </form>
        </div>
    </div>

    <!-- ========= Notificación Toast ========= -->
    <div id="notificationToast" class="fixed bottom-24 inset-x-0 flex justify-center px-4 pointer-events-none">
        <div id="notificationToastContent" class="text-white text-sm font-semibold rounded-lg shadow-lg px-4 py-3 text-center max-w-sm pointer-events-auto">
            <!-- Message will be inserted here -->
        </div>
    </div>
    
    <!-- Librerías JS -->
    <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://npmcdn.com/flatpickr/dist/l10n/es.js"></script>
    <script src="https://npmcdn.com/flatpickr/dist/plugins/monthSelect/index.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>


    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Vistas y Navegación
            const dashboardView = document.getElementById('dashboardView');
            const myKeyView = document.getElementById('myKeyView');
            const historyView = document.getElementById('historyView');
            const clientsView = document.getElementById('clientsView');
            const settingsView = document.getElementById('settingsView');
            const paymentMethodsView = document.getElementById('paymentMethodsView');
            const myKeysView = document.getElementById('myKeysView');
            const accountsView = document.getElementById('accountsView');
            const statisticsView = document.getElementById('statisticsView');

            const inicioNavBtn = document.getElementById('inicioNavBtn');
            const cobrosNavBtn = document.getElementById('cobrosNavBtn');
            const clientsNavBtn = document.getElementById('clientsNavBtn');
            const settingsNavBtn = document.getElementById('settingsNavBtn');
            const myKeyBtn = document.getElementById('myKeyBtn');
            const myKeysLink = document.getElementById('myKeysLink');
            const cobrosQuickBtn = document.getElementById('cobrosQuickBtn');
            const clientsQuickBtn = document.getElementById('clientsQuickBtn');
            const settingsQuickBtn = document.getElementById('settingsQuickBtn');
            const statsQuickBtn = document.getElementById('statsQuickBtn');
            const verTodoBtn = document.getElementById('verTodoBtn');
            const backToDashboardBtnKey = document.getElementById('backToDashboardBtnKey');
            const backToDashboardBtnHistory = document.getElementById('backToDashboardBtnHistory');
            const backToDashboardBtnClients = document.getElementById('backToDashboardBtnClients');
            const backToDashboardBtnSettings = document.getElementById('backToDashboardBtnSettings');
            const backToDashboardBtnStats = document.getElementById('backToDashboardBtnStats');
            const backToSettingsBtnKeys = document.getElementById('backToSettingsBtnKeys');
            const paymentMethodsLink = document.getElementById('paymentMethodsLink');
            const accountsLink = document.getElementById('accountsLink');
            const backToSettingsBtn = document.getElementById('backToSettingsBtn');
            const editPaymentMethodsBtn = document.getElementById('editPaymentMethodsBtn');
            const backToSettingsBtnAccounts = document.getElementById('backToSettingsBtnAccounts');
            const addAccountBtn = document.getElementById('addAccountBtn');
            

            // Modales
            const openModalBtn = document.getElementById('openModalBtn');
            const modal = document.getElementById('createChargeModal');
            const cancelBtn = document.getElementById('cancelBtn');
            const chargeForm = document.getElementById('chargeForm');
            const userIdInput = document.getElementById('userId');
            const amountInput = document.getElementById('amount');
            const scheduledDateInput = document.getElementById('scheduledDate');
            const addClientModal = document.getElementById('addClientModal');
            const addClientBtn = document.getElementById('addClientBtn');
            const cancelAddClientBtn = document.getElementById('cancelAddClientBtn');
            const addClientForm = document.getElementById('addClientForm');
            const addAccountModal = document.getElementById('addAccountModal');
            const addAccountForm = document.getElementById('addAccountForm');
            const cancelAddAccountBtn = document.getElementById('cancelAddAccountBtn');
            const addKeyModal = document.getElementById('addKeyModal');
            const addKeyBtn = document.getElementById('addKeyBtn');
            const cancelAddKeyBtn = document.getElementById('cancelAddKeyBtn');
            const addKeyForm = document.getElementById('addKeyForm');
            

            // Contenedores
            const chargesContainer = document.getElementById('chargesContainer');
            const historyChargesContainer = document.getElementById('historyChargesContainer');
            const clientsListContainer = document.getElementById('clientsListContainer');
            const paymentMethodsList = document.getElementById('paymentMethodsList');
            const accountsListContainer = document.getElementById('accountsListContainer');
            const keysListContainer = document.getElementById('keysListContainer');
            const noChargesMessage = document.getElementById('noChargesMessage');
            const noHistoryChargesMessage = document.getElementById('noHistoryChargesMessage');
            const noClientsMessage = document.getElementById('noClientsMessage');

            // Filtros, Búsqueda y Acciones Masivas
            const monthFilterInput = document.getElementById('monthFilter');
            const statusFilterContainer = document.getElementById('statusFilterContainer');
            const clientSearchInput = document.getElementById('clientSearchInput');
            const exportExcelBtn = document.getElementById('exportExcelBtn');
            const downloadTemplateBtn = document.getElementById('downloadTemplateBtn');
            const importExcelInput = document.getElementById('importExcelInput');
            const todaysBalance = document.getElementById('todaysBalance');

            // Notificaciones
            const notificationToast = document.getElementById('notificationToast');
            const notificationToastContent = document.getElementById('notificationToastContent');
            const notificationBellBtn = document.getElementById('notificationBellBtn');
            const bellIcon = document.getElementById('bellIcon');
            const notificationsDropdown = document.getElementById('notificationsDropdown');

            let allChargesData = [];
            let allClientsData = [];
            let paymentMethodsData = [];
            let allAccountsData = [];
            let allKeysData = [];
            let isEditingPaymentMethods = false;
            let currentStatusFilter = 'Todos';
            let currentMonthFilter = '';
            let statsChart = null;
            const MY_MERCHANT_ID = 'SBRD7805';
            
            // --- Pusher Real-time Integration ---
            const pusher = new Pusher('956911c53ec94274858e', { cluster: 'mt1' });
            Pusher.logToConsole = true;
            
            const commerceChannel = pusher.subscribe(`commerce-${MY_MERCHANT_ID}`);
            
            commerceChannel.bind('pusher:subscription_succeeded', () => {
                console.log(`Suscrito al canal del comercio: commerce-${MY_MERCHANT_ID}`);
                showNotification('Conectado al servicio de notificaciones.', 'success'); 
            });

            commerceChannel.bind('pusher:subscription_error', (status) => {
                console.error('Error de suscripción a Pusher:', status);
                showNotification('Error al conectar con notificaciones.', 'error');
            });

            commerceChannel.bind('payment-authorized', (data) => {
                console.log('Pago autorizado recibido vía Pusher:', data);
                if (data.chargeId) {
                    handlePaymentAuthorization(data.chargeId);
                }
            });

            const handlePaymentAuthorization = (chargeId) => {
                const chargeToUpdate = allChargesData.find(c => c.id === chargeId);
                if (chargeToUpdate && chargeToUpdate.status === 'Pendiente') {
                    chargeToUpdate.status = 'Recibido';
                    chargeToUpdate.timestamp = new Date(); 

                    if (chargeToUpdate.timerId) {
                        clearInterval(chargeToUpdate.timerId);
                        chargeToUpdate.timerId = null;
                    }
                    renderDashboardCharges();
                    if (!historyView.classList.contains('hidden')) {
                        applyFiltersAndRender();
                    }
                    updateTodaysBalance();
                    showNotification(`¡Pago de $${formatCurrency(chargeToUpdate.amount)} recibido!`, 'success');
                }
            };
            
            const triggerNewCharge = (chargeData) => {
                const backendUrl = 'https://wepago-beta.vercel.app/'; // <-- REEMPLAZAR
                console.log(`Enviando cobro al backend para el usuario ${chargeData.userId}`);
                
                fetch(`${backendUrl}/trigger-charge`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: chargeData.userId,
                        amount: chargeData.amount,
                        merchantName: "Salon de Belleza Rizos Dorados",
                        chargeId: chargeData.id,
                        merchantId: MY_MERCHANT_ID
                    })
                })
                .then(response => {
                    if(!response.ok) { throw new Error('Error en la respuesta del servidor'); }
                    return response.text();
                })
                .then(responseText => {
                    console.log('Respuesta del backend (envío de cobro):', responseText);
                })
                .catch(error => {
                    console.error('Error al enviar cobro al backend:', error);
                    showNotification('No se pudo enviar el cobro al usuario.', 'error');
                });
            };


             // --- Lógica de Navegación entre Vistas ---
            const navigateTo = (view) => {
                const navButtons = [inicioNavBtn, cobrosNavBtn, clientsNavBtn, settingsNavBtn];
                const views = [dashboardView, myKeyView, historyView, clientsView, settingsView, myKeysView, paymentMethodsView, accountsView, statisticsView];
                
                views.forEach(v => v.classList.add('hidden'));
                navButtons.forEach(btn => {
                    btn.classList.remove('text-slate-800');
                    btn.classList.add('text-slate-400');
                    btn.querySelector('span').classList.remove('font-bold');
                    btn.querySelector('span').classList.add('font-medium');
                });

                if (view === 'history') {
                    historyView.classList.remove('hidden');
                    cobrosNavBtn.classList.add('text-slate-800');
                    cobrosNavBtn.querySelector('span').classList.add('font-bold');
                    applyFiltersAndRender();
                } else if (view === 'clients') {
                    clientsView.classList.remove('hidden');
                    clientsNavBtn.classList.add('text-slate-800');
                    clientsNavBtn.querySelector('span').classList.add('font-bold');
                    renderClients();
                } else if (view === 'settings') {
                    settingsView.classList.remove('hidden');
                    settingsNavBtn.classList.add('text-slate-800');
                    settingsNavBtn.querySelector('span').classList.add('font-bold');
                } else if (view === 'myKeys') {
                    myKeysView.classList.remove('hidden');
                    settingsNavBtn.classList.add('text-slate-800');
                    settingsNavBtn.querySelector('span').classList.add('font-bold');
                } else if (view === 'paymentMethods') {
                    paymentMethodsView.classList.remove('hidden');
                    settingsNavBtn.classList.add('text-slate-800');
                    settingsNavBtn.querySelector('span').classList.add('font-bold');
                } else if (view === 'accounts') {
                    accountsView.classList.remove('hidden');
                    settingsNavBtn.classList.add('text-slate-800');
                    settingsNavBtn.querySelector('span').classList.add('font-bold');
                } else if (view === 'statistics') {
                    statisticsView.classList.remove('hidden');
                    initializeStatistics();
                } else if (view === 'myKey') {
                    myKeyView.classList.remove('hidden');
                    const qrcodeContainer = document.getElementById('qrcodeContainer');
                    qrcodeContainer.innerHTML = ''; // Limpiar QR anterior
                    new QRCode(qrcodeContainer, {
                        text: "SBRD7805",
                        width: 256,
                        height: 256,
                        colorDark : "#1e293b", // slate-800
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.H
                    });
                }
                else { // 'dashboard'
                    dashboardView.classList.remove('hidden');
                    inicioNavBtn.classList.add('text-slate-800');
                    inicioNavBtn.querySelector('span').classList.add('font-bold');
                    updateTodaysBalance();
                    renderDashboardCharges();
                }
            };
            
            // --- Funciones de formato y cálculo ---
            const formatCurrency = (number) => new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
            const formatTimestamp = (date) => date.toLocaleString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
            const formatDate = (date) => date.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric'});
            
            const updateTodaysBalance = () => {
                const now = new Date();
                const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

                const todaysReceivedCharges = allChargesData.filter(charge => {
                    return charge.status === 'Recibido' &&
                           charge.timestamp >= todayStart &&
                           charge.timestamp < todayEnd;
                });

                const total = todaysReceivedCharges.reduce((sum, charge) => sum + charge.amount, 0);
                todaysBalance.textContent = `$${formatCurrency(total)}`;
            };

            // --- Función del cronómetro ---
            function startCountdown(chargeElement, chargeData) {
                if (!chargeElement) return;
                const timerElement = chargeElement.querySelector('.timer-text');
                const statusText = chargeElement.querySelector('.status-text');
                const initialTimeLeft = (chargeData.timestamp.getTime() + 60000 - Date.now()) / 1000;
                
                let timeLeft = initialTimeLeft > 0 ? initialTimeLeft : 0;
                
                const updateTimerDisplay = () => {
                    if (timeLeft > 0 && timerElement) {
                        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
                        const seconds = Math.round(timeLeft % 60).toString().padStart(2, '0');
                        timerElement.textContent = `(${minutes}:${seconds})`;
                    } else if (timerElement) {
                        timerElement.style.display = 'none';
                    }
                };

                const expireCharge = () => {
                    if (chargeData.status === 'Pendiente') {
                        chargeData.status = 'Expirado';
                        renderDashboardCharges();
                        if(!historyView.classList.contains('hidden')) {
                            applyFiltersAndRender();
                        }
                    }
                };
                
                if (timeLeft <= 0) { expireCharge(); return; }
                
                updateTimerDisplay();

                const intervalId = setInterval(() => {
                    if (chargeData.status !== 'Pendiente') {
                        clearInterval(intervalId);
                        if(timerElement) timerElement.style.display = 'none';
                        return;
                    }
                    timeLeft--;
                    updateTimerDisplay();
                    if (timeLeft < 0) {
                        clearInterval(intervalId);
                        expireCharge();
                    }
                }, 1000);
                chargeData.timerId = intervalId;
            }
            
            const getFilteredCharges = () => {
                let filtered = allChargesData;
                
                if (currentMonthFilter) {
                    const [year, month] = currentMonthFilter.split('-').map(Number);
                     filtered = allChargesData.filter(charge => {
                        const chargeDate = charge.timestamp;
                        return chargeDate.getFullYear() === year && (chargeDate.getMonth() + 1) === month;
                    });
                }
               

                if (currentStatusFilter !== 'Todos') {
                    filtered = filtered.filter(charge => charge.status === currentStatusFilter);
                }
                return filtered.sort((a,b) => b.timestamp - a.timestamp);
            }

            // --- Lógica de Filtros (UI y Aplicación) ---
            const updateStatusFilterUI = () => {
                 statusFilterContainer.querySelectorAll('button').forEach(btn => {
                    if (btn.dataset.status === currentStatusFilter) {
                        btn.classList.add('bg-slate-800', 'text-white');
                        btn.classList.remove('text-slate-600');
                    } else {
                        btn.classList.remove('bg-slate-800', 'text-white');
                        btn.classList.add('text-slate-600');
                    }
                });
            };
            
            const applyFiltersAndRender = () => {
                historyChargesContainer.innerHTML = '';
                const filteredCharges = getFilteredCharges();
                
                if (filteredCharges.length === 0) {
                    noHistoryChargesMessage.classList.remove('hidden');
                } else {
                    noHistoryChargesMessage.classList.add('hidden');
                    filteredCharges.forEach(charge => historyChargesContainer.appendChild(createChargeElement(charge)));
                }
            };
            
            // --- Función para crear el elemento HTML de un cobro ---
            const createChargeElement = (chargeData) => {
                const { id, userId, amount, status, timestamp, scheduledDate } = chargeData;
                const chargeElement = document.createElement('div');
                chargeElement.id = `charge-${id}`;
                chargeElement.className = 'flex items-start justify-between bg-white p-4 rounded-xl soft-shadow';
                let icon, statusTagClasses, dateInfo;

                switch (status) {
                    case 'Pendiente':
                        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`;
                        statusTagClasses = 'bg-amber-100 text-amber-800';
                        dateInfo = `<p class="text-xs text-slate-500 mt-0.5">${formatTimestamp(timestamp)}</p>`;
                        break;
                    case 'Recibido':
                        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                        statusTagClasses = 'bg-green-100 text-green-800';
                        dateInfo = `<p class="text-xs text-slate-500 mt-0.5">${formatTimestamp(timestamp)}</p>`;
                        break;
                    case 'Programado':
                        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
                        statusTagClasses = 'bg-blue-100 text-blue-800';
                        dateInfo = `<p class="text-xs text-slate-500 mt-0.5 font-medium">Fecha: ${formatDate(scheduledDate)}</p>`;
                        break;
                    case 'Expirado':
                        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>`;
                        statusTagClasses = 'bg-red-100 text-red-800';
                        dateInfo = `<p class="text-xs text-slate-500 mt-0.5">${formatTimestamp(timestamp)}</p>`;
                        break;
                }

                chargeElement.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <div class="icon-container w-11 h-11 ${statusTagClasses} rounded-full flex items-center justify-center flex-shrink-0">
                            ${icon}
                        </div>
                        <div>
                            <p class="font-bold text-slate-800 text-sm">${userId}</p>
                            ${dateInfo}
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-slate-800 text-base">$${formatCurrency(amount)}</p>
                         <div class="status-container inline-flex items-center space-x-1.5 text-xs mt-1 font-semibold px-2 py-0.5 rounded-full ${statusTagClasses}">
                            <span class="status-text">${status}</span>
                            <span class="timer-text font-mono"></span>
                        </div>
                    </div>`;

                if (status === 'Pendiente') {
                    startCountdown(chargeElement, chargeData);
                }
                return chargeElement;
            }

            const renderDashboardCharges = () => {
                chargesContainer.innerHTML = '';
                const recentCharges = allChargesData.slice().sort((a,b) => b.timestamp - a.timestamp).slice(0, 5);
                if (recentCharges.length === 0) {
                     noChargesMessage.classList.remove('hidden');
                } else {
                     noChargesMessage.classList.add('hidden');
                     recentCharges.forEach(charge => chargesContainer.appendChild(createChargeElement(charge)));
                }
            };
            
            // --- Lógica de Clientes, Cuentas y Métodos de Pago---
            const renderClients = (filteredClients = allClientsData) => {
                clientsListContainer.innerHTML = '';
                if (filteredClients.length === 0) {
                    noClientsMessage.classList.remove('hidden');
                } else {
                    noClientsMessage.classList.add('hidden');
                    filteredClients.forEach(client => {
                        const clientElement = document.createElement('div');
                        clientElement.className = 'flex items-center justify-between bg-white p-4 rounded-xl soft-shadow';
                        clientElement.innerHTML = `
                             <div class="flex items-center space-x-4">
                                <div class="w-11 h-11 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-lg">${client.name.charAt(0)}</div>
                                <div>
                                    <p class="font-bold text-slate-800 text-sm">${client.name}</p>
                                    <p class="text-xs text-slate-500 mt-0.5">${client.userId}</p>
                                </div>
                             </div>
                             <div class="flex items-center space-x-2">
                                <button data-userid="${client.userId}" class="charge-client-btn px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold text-xs">Cobrar</button>
                             </div>
                        `;
                        clientsListContainer.appendChild(clientElement);
                    });
                }
            };

            const renderPaymentMethods = () => {
                paymentMethodsList.innerHTML = '';
                paymentMethodsData.forEach((method, index) => {
                    const methodElement = document.createElement('div');
                    methodElement.className = 'flex items-center justify-between bg-white p-4 rounded-xl soft-shadow';
                    methodElement.innerHTML = `
                        <span class="font-semibold text-slate-700">${method.name}</span>
                        <div class="commission-container">
                             <span class="view-commission text-sm font-medium text-slate-500 ${isEditingPaymentMethods ? 'hidden' : ''}">${method.commission}</span>
                             <input data-index="${index}" type="text" value="${method.commission}" class="edit-commission text-right text-sm font-medium text-slate-700 border border-slate-300 rounded-md px-2 py-1 w-32 ${isEditingPaymentMethods ? '' : 'hidden'}">
                        </div>
                    `;
                    paymentMethodsList.appendChild(methodElement);
                });
            };

            const renderAccounts = () => {
                accountsListContainer.innerHTML = '';
                 allAccountsData.forEach(account => {
                    const accountElement = document.createElement('div');
                    accountElement.className = `flex items-center justify-between bg-white p-4 rounded-xl soft-shadow transition-opacity ${!account.isActive ? 'opacity-50' : ''}`;
                    accountElement.innerHTML = `
                        <div>
                            <p class="font-bold text-slate-800 text-sm">${account.accountName}</p>
                            <p class="text-xs text-slate-500 mt-0.5">${account.bankName} - ${account.accountType}</p>
                            <p class="text-xs text-slate-500 mt-1">${account.accountNumber}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                             <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer account-toggle-switch" data-accountnumber="${account.accountNumber}" ${account.isActive ? 'checked' : ''}>
                                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>
                    `;
                    accountsListContainer.appendChild(accountElement);
                });
            }

            const renderKeys = () => {
                keysListContainer.innerHTML = '';
                 allKeysData.forEach(keyData => {
                    const keyElement = document.createElement('div');
                    keyElement.className = 'flex items-center justify-between bg-white p-4 rounded-xl soft-shadow';
                    
                    let deleteButtonHTML = '';
                    if (!keyData.isDefault) {
                        deleteButtonHTML = `
                            <button data-key="${keyData.key}" class="delete-key-btn w-9 h-9 flex items-center justify-center bg-red-100 text-red-500 rounded-full flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>`;
                    }

                    keyElement.innerHTML = `
                        <div class="flex items-center space-x-3">
                            <div class="w-9 h-9 bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                            </div>
                            <span class="font-semibold text-slate-700 tracking-wider">${keyData.key}</span>
                        </div>
                        ${deleteButtonHTML}
                    `;
                    keysListContainer.appendChild(keyElement);
                });
            }


            // --- Agregar datos de prueba al cargar ---
            const initializeData = () => {
                 // Llaves
                allKeysData = [
                    { key: 'SBRD7805', isDefault: true }
                ];

                // Cuentas Bancarias
                allAccountsData = [
                    { accountName: 'Cuenta Bancolombia', accountNumber: '77012345678', accountType: 'Ahorros', bankName: 'Bancolombia', isActive: true }
                ];
                
                // Métodos de pago
                paymentMethodsData = [
                    { name: 'Nequi', commission: '2.0% + $500' },
                    { name: 'Daviplata', commission: '1.8% + $400' },
                    { name: 'Bancolombia', commission: '2.2% + $600' },
                    { name: 'Tarjeta de crédito', commission: '3.5% + $900' },
                ];

                // Clientes
                allClientsData = [
                    { name: 'Ana García', userId: 'user_ana_g', phone: '310-123-4567', registrationNumber: 'REG-001' },
                    { name: 'Carlos Rodriguez', userId: 'user_carlos_r', phone: '311-987-6543', registrationNumber: 'REG-002' },
                    { name: 'Maria Fernandez', userId: 'user_maria_f', phone: '312-555-1234', registrationNumber: 'REG-003' },
                    { name: 'Juan Martinez', userId: 'user_juan_m', phone: '313-456-7890', registrationNumber: 'REG-004' },
                    { name: 'Sofia Lopez', userId: 'user_sofia_l', phone: '314-789-0123', registrationNumber: '' },
                    { name: 'Luis Perez', userId: 'user_luis_p', phone: '315-234-5678', registrationNumber: 'REG-006' },
                ];


                // Cobros
                const now = new Date();
                const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, 15);
                let existingCharges = [
                    { id: Date.now() + 1, userId: 'E1000', amount: 50000.00, status: 'Recibido', timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000) }, // Received today
                    { id: Date.now() + 2, userId: 'E1000', amount: 125000.00, status: 'Recibido', timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000) }, // Received today
                    { id: Date.now() + 5, userId: 'E1000', amount: 20000.00, status: 'Expirado', timestamp: new Date(now.getTime() - 3660000) },
                    { id: Date.now() + 6, userId: 'E1000', amount: 150000.00, status: 'Recibido', timestamp: new Date(now.getTime() - 25 * 60 * 60 * 1000) }, // Yesterday
                ];
                
                const augustCharges = [];
                for (let i = 1; i <= 20; i++) {
                    const day = Math.floor(Math.random() * 28) + 1;
                    const statusOptions = ['Recibido', 'Expirado'];
                    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
                    augustCharges.push({
                        id: Date.now() + 11 + i,
                        userId: `user_ago_${i.toString().padStart(2, '0')}`,
                        amount: Math.random() * 200000 + 1000,
                        status: randomStatus,
                        timestamp: new Date(oneMonthAgo.getFullYear(), oneMonthAgo.getMonth(), day)
                    });
                }

                allChargesData = [...existingCharges, ...augustCharges];
                
                const year = now.getFullYear();
                const month = (now.getMonth() + 1).toString().padStart(2, '0');
                currentMonthFilter = `${year}-${month}`;
                
                updateTodaysBalance();
                updateStatusFilterUI();
                renderDashboardCharges();
                renderClients();
                renderPaymentMethods();
                renderAccounts();
                renderKeys();
            };
            
            // --- INICIALIZACIÓN ---
            initializeData();

            // Configurar Flatpickr
             flatpickr(monthFilterInput, {
                plugins: [
                    new monthSelectPlugin({ shorthand: false, dateFormat: "Y-m", altFormat: "F Y" })
                ],
                locale: "es",
                defaultDate: currentMonthFilter,
                onChange: function(selectedDates, dateStr, instance) {
                    currentMonthFilter = dateStr;
                    applyFiltersAndRender();
                }
            });

             flatpickr(scheduledDateInput, {
                locale: "es",
                dateFormat: "Y-m-d",
                minDate: "today",
            });


            // --- Lógica de Estadísticas ---
            const initializeStatistics = () => {
                const statsPeriodFilter = document.getElementById('statsPeriodFilter');
                updateStatistics('today'); // Cargar stats de 'Hoy' por defecto

                statsPeriodFilter.addEventListener('click', (e) => {
                    if (e.target.tagName === 'BUTTON') {
                        const period = e.target.dataset.period;
                        statsPeriodFilter.querySelectorAll('button').forEach(btn => {
                            btn.classList.remove('bg-slate-800', 'text-white');
                             btn.classList.add('text-slate-600');
                        });
                        e.target.classList.add('bg-slate-800', 'text-white');
                        e.target.classList.remove('text-slate-600');
                        updateStatistics(period);
                    }
                });
            };

            const updateStatistics = (period) => {
                const now = new Date();
                let startDate, endDate = new Date(now);
                endDate.setHours(23, 59, 59, 999); 

                if (period === 'today') {
                    startDate = new Date(now);
                    startDate.setHours(0, 0, 0, 0);
                } else if (period === 'week') {
                    startDate = new Date(now);
                    const dayOfWeek = now.getDay();
                    startDate.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Lunes como inicio de semana
                    startDate.setHours(0, 0, 0, 0);
                } else if (period === 'month') {
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    startDate.setHours(0, 0, 0, 0);
                }

                const periodCharges = allChargesData.filter(c => c.timestamp >= startDate && c.timestamp <= endDate);
                const successfulCharges = periodCharges.filter(c => c.status === 'Recibido');

                const totalRevenue = successfulCharges.reduce((sum, charge) => sum + charge.amount, 0);
                const successCount = successfulCharges.length;
                const successRate = periodCharges.length > 0 ? (successCount / periodCharges.length) * 100 : 0;
                
                document.getElementById('statsTotalRevenue').textContent = `$${formatCurrency(totalRevenue)}`;
                document.getElementById('statsSuccessfulCharges').textContent = successCount;
                document.getElementById('statsSuccessRate').textContent = `${successRate.toFixed(1)}%`;

                // Cliente principal
                const clientCounts = successfulCharges.reduce((acc, charge) => {
                    acc[charge.userId] = (acc[charge.userId] || 0) + 1;
                    return acc;
                }, {});

                const topClientUserId = Object.keys(clientCounts).sort((a,b) => clientCounts[b] - clientCounts[a])[0];
                const topClientContainer = document.getElementById('statsTopClient');

                if (topClientUserId) {
                    const topClientData = allClientsData.find(c => c.userId === topClientUserId);
                    const clientName = topClientData ? topClientData.name : topClientUserId;
                    topClientContainer.innerHTML = `
                         <div class="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                         </div>
                         <div>
                             <p class="font-bold text-slate-800 text-sm">${clientName}</p>
                             <p class="text-xs text-slate-500 mt-0.5">${clientCounts[topClientUserId]} cobros exitosos</p>
                         </div>`;
                } else {
                    topClientContainer.innerHTML = `<p class="text-sm text-slate-500 text-center w-full">No hay datos de clientes para este período.</p>`;
                }

                renderStatsChart(period, startDate, endDate, successfulCharges);
            };

            const renderStatsChart = (period, startDate, endDate, data) => {
                const statsChartCanvas = document.getElementById('statsChart');
                let labels, chartData;

                if (period === 'today') {
                    labels = Array.from({ length: 12 }, (_, i) => `${i * 2}:00`); // Bloques de 2 horas
                    chartData = Array(12).fill(0);
                    data.forEach(charge => {
                        const hour = charge.timestamp.getHours();
                        const index = Math.floor(hour / 2);
                        chartData[index] += charge.amount;
                    });
                } else if (period === 'week') {
                    labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
                    chartData = Array(7).fill(0);
                    data.forEach(charge => {
                        let dayIndex = charge.timestamp.getDay();
                        dayIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Lunes=0, Domingo=6
                        chartData[dayIndex] += charge.amount;
                    });
                } else { // month
                    const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
                    labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
                    chartData = Array(daysInMonth).fill(0);
                    data.forEach(charge => {
                        const dayOfMonth = charge.timestamp.getDate();
                        chartData[dayOfMonth - 1] += charge.amount;
                    });
                }

                if (statsChart) {
                    statsChart.destroy();
                }

                statsChart = new Chart(statsChartCanvas, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Ingresos',
                            data: chartData,
                            backgroundColor: '#1e293b', // slate-800
                            borderRadius: 8,
                            borderSkipped: false,
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return `$${formatCurrency(context.raw)}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: { beginAtZero: true },
                            x: { grid: { display: false } }
                        }
                    }
                });
            };
            
            // --- Sistema de Notificaciones ---
            const showNotification = (message, type = 'success') => {
                notificationToastContent.textContent = message;
                if (type === 'success') {
                    notificationToastContent.className = 'bg-green-500 text-white text-sm font-semibold rounded-lg shadow-lg px-4 py-3 text-center';
                } else { // error
                    notificationToastContent.className = 'bg-red-500 text-white text-sm font-semibold rounded-lg shadow-lg px-4 py-3 text-center';
                }
                notificationToast.classList.add('show');
                setTimeout(() => {
                    notificationToast.classList.remove('show');
                }, 3000);
            };

            // --- Lógica para activar cobros programados ---
            const checkScheduledCharges = () => {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Normalizar a medianoche para comparar solo la fecha
                
                allChargesData.forEach(charge => {
                    if (charge.status === 'Programado' && charge.scheduledDate <= today) {
                        charge.status = 'Pendiente';
                        charge.timestamp = new Date(); // Marcar la hora de activación

                        // Actualizar la UI si el cobro es visible
                        const chargeElement = document.getElementById(`charge-${charge.id}`);
                        if (chargeElement) {
                             const newElement = createChargeElement(charge);
                             chargeElement.parentNode.replaceChild(newElement, chargeElement);
                        }
                    }
                });
            };

            // Revisar cada 10 segundos por cobros programados para activar
            setInterval(checkScheduledCharges, 10000);

            // --- EVENT LISTENERS ---
            // Notificaciones
            if (bellIcon) {
                bellIcon.classList.add('animate-ring');
            }
            notificationBellBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationsDropdown.classList.toggle('hidden');
            });
            window.addEventListener('click', (e) => {
                if (!notificationsDropdown.classList.contains('hidden')) {
                    if (!notificationBellBtn.contains(e.target) && !notificationsDropdown.contains(e.target)) {
                        notificationsDropdown.classList.add('hidden');
                    }
                }
            });

            // Navegación
            cobrosNavBtn.addEventListener('click', (e) => { e.preventDefault(); navigateTo('history'); });
            clientsNavBtn.addEventListener('click', (e) => { e.preventDefault(); navigateTo('clients'); });
            myKeyBtn.addEventListener('click', () => navigateTo('myKey'));
            myKeysLink.addEventListener('click', (e) => { e.preventDefault(); navigateTo('myKeys'); });
            cobrosQuickBtn.addEventListener('click', (e) => { e.preventDefault(); navigateTo('history'); });
            clientsQuickBtn.addEventListener('click', (e) => { e.preventDefault(); navigateTo('clients'); });
            settingsNavBtn.addEventListener('click', (e) => { e.preventDefault(); navigateTo('settings'); });
            settingsQuickBtn.addEventListener('click', (e) => { e.preventDefault(); navigateTo('settings'); });
            statsQuickBtn.addEventListener('click', (e) => { e.preventDefault(); navigateTo('statistics'); });
            verTodoBtn.addEventListener('click', (e) => { e.preventDefault(); navigateTo('history'); });
            inicioNavBtn.addEventListener('click', (e) => { e.preventDefault(); navigateTo('dashboard'); });
            backToDashboardBtnKey.addEventListener('click', () => navigateTo('dashboard'));
            backToDashboardBtnHistory.addEventListener('click', () => navigateTo('dashboard'));
            backToDashboardBtnClients.addEventListener('click', () => navigateTo('dashboard'));
            backToDashboardBtnSettings.addEventListener('click', () => navigateTo('dashboard'));
            backToDashboardBtnStats.addEventListener('click', () => navigateTo('dashboard'));
            backToSettingsBtnKeys.addEventListener('click', () => navigateTo('settings'));
            paymentMethodsLink.addEventListener('click', (e) => { e.preventDefault(); navigateTo('paymentMethods'); });
            accountsLink.addEventListener('click', (e) => { e.preventDefault(); navigateTo('accounts'); });
            backToSettingsBtn.addEventListener('click', () => navigateTo('settings'));
            backToSettingsBtnAccounts.addEventListener('click', () => navigateTo('settings'));


            // Modal Crear Cobro
            const resetAndHideChargeModal = () => {
                chargeForm.reset();
                userIdInput.readOnly = false;
                modal.classList.remove('visible');
            };

            const showChargeModal = () => modal.classList.add('visible');
            openModalBtn.addEventListener('click', showChargeModal);
            cancelBtn.addEventListener('click', resetAndHideChargeModal);
            modal.addEventListener('click', (e) => e.target === modal && resetAndHideChargeModal());

            // Modal Añadir Cliente
            const showAddClientModal = () => addClientModal.classList.add('visible');
            const hideAddClientModal = () => {
                addClientForm.reset();
                addClientModal.classList.remove('visible');
            };
            addClientBtn.addEventListener('click', showAddClientModal);
            cancelAddClientBtn.addEventListener('click', hideAddClientModal);
            addClientModal.addEventListener('click', (e) => e.target === addClientModal && hideAddClientModal());

            // Modal Añadir Cuenta
            const showAddAccountModal = () => addAccountModal.classList.add('visible');
            const hideAddAccountModal = () => {
                addAccountForm.reset();
                addAccountModal.classList.remove('visible');
            };
            addAccountBtn.addEventListener('click', showAddAccountModal);
            cancelAddAccountBtn.addEventListener('click', hideAddAccountModal);
            addAccountModal.addEventListener('click', (e) => e.target === addAccountModal && hideAddAccountModal());
            
            // Modal Añadir Llave
            const showAddKeyModal = () => addKeyModal.classList.add('visible');
            const hideAddKeyModal = () => {
                addKeyForm.reset();
                addKeyModal.classList.remove('visible');
            };
            addKeyBtn.addEventListener('click', showAddKeyModal);
            cancelAddKeyBtn.addEventListener('click', hideAddKeyModal);
            addKeyModal.addEventListener('click', (e) => e.target === addKeyModal && hideAddKeyModal());


            // Formateo de input de moneda
            amountInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/[^\d,]/g, '');
                const parts = value.split(',');
                if (parts.length > 2) value = parts[0] + ',' + parts.slice(1).join('');
                let [integerPart, decimalPart] = value.split(',');
                integerPart = integerPart.replace(/\./g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                e.target.value = decimalPart !== undefined ? integerPart + ',' + decimalPart.substring(0, 2) : integerPart;
            });

            // Lógica de Formularios
            chargeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const userId = userIdInput.value;
                const rawAmount = amountInput.value;
                const isReceived = e.target.markAsReceived.checked;
                const scheduledDateValue = scheduledDateInput.value;
                
                const cleanAmount = rawAmount.replace(/\./g, '').replace(',', '.');
                const amount = parseFloat(cleanAmount);

                if (userId && amount > 0) {
                    const newCharge = { 
                        id: Date.now(),
                        userId, 
                        amount, 
                        timestamp: new Date() 
                    };

                    if (scheduledDateValue) {
                        const scheduled = new Date(scheduledDateValue + 'T00:00:00'); // Set to start of day
                        const today = new Date();
                        today.setHours(0,0,0,0);
                        
                        if (scheduled > today) {
                            newCharge.status = 'Programado';
                            newCharge.scheduledDate = scheduled;
                        } else {
                            // Date is today or past, treat as immediate
                             newCharge.status = isReceived ? 'Recibido' : 'Pendiente';
                        }
                    } else {
                        // No date selected, immediate charge
                        newCharge.status = isReceived ? 'Recibido' : 'Pendiente';
                    }

                    allChargesData.unshift(newCharge);

                    if (newCharge.status === 'Pendiente') {
                        triggerNewCharge(newCharge);
                    }

                    resetAndHideChargeModal();
                    navigateTo('dashboard');
                    showNotification('Cobro creado exitosamente.');
                }
            });
            
            addClientForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = e.target.clientName.value.trim();
                const userId = e.target.clientUserId.value.trim();
                const phone = e.target.clientPhone.value.trim();
                const registrationNumber = e.target.clientRegistrationNumber.value.trim();

                if (name && userId && phone) {
                    if (allClientsData.some(client => client.userId === userId)) {
                        showNotification('El ID de usuario ya existe.', 'error');
                        return;
                    }
                    allClientsData.unshift({ name, userId, phone, registrationNumber });
                    renderClients();
                    hideAddClientModal();
                    showNotification('Cliente añadido correctamente.');
                }
            });

             addAccountForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const accountName = e.target.accountName.value.trim();
                const accountNumber = e.target.accountNumber.value.trim();
                const accountType = e.target.accountType.value;
                const bankName = e.target.bankName.value.trim();

                if (accountName && accountNumber && accountType && bankName) {
                     if (allAccountsData.some(acc => acc.accountNumber === accountNumber)) {
                        showNotification('Este número de cuenta ya existe.', 'error');
                        return;
                    }
                    allAccountsData.unshift({ accountName, accountNumber, accountType, bankName, isActive: true });
                    renderAccounts();
                    hideAddAccountModal();
                    showNotification('Cuenta guardada exitosamente.');
                }
            });
            
             addKeyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const newKey = e.target.newKeyInput.value.trim();
                const alphanumericRegex = /^[a-zA-Z0-9]+$/;

                if (newKey.length < 5) {
                    showNotification('La llave debe tener al menos 5 caracteres.', 'error');
                    return;
                }
                if (!alphanumericRegex.test(newKey)) {
                     showNotification('La llave solo puede contener letras y números.', 'error');
                    return;
                }
                if (allKeysData.some(keyData => keyData.key.toLowerCase() === newKey.toLowerCase())) {
                    showNotification('Esta llave ya existe.', 'error');
                    return;
                }
                
                allKeysData.push({ key: newKey, isDefault: false });
                renderKeys();
                hideAddKeyModal();
                showNotification('Llave creada exitosamente.');
            });
            
            // Filtros y Búsqueda
            statusFilterContainer.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') {
                    currentStatusFilter = e.target.dataset.status;
                    updateStatusFilterUI();
                    applyFiltersAndRender();
                }
            });
            
            clientSearchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filtered = allClientsData.filter(client => 
                    client.name.toLowerCase().includes(searchTerm) ||
                    client.userId.toLowerCase().includes(searchTerm) ||
                    client.phone.includes(searchTerm) ||
                    (client.registrationNumber && client.registrationNumber.toLowerCase().includes(searchTerm))
                );
                renderClients(filtered);
            });
            
            clientsListContainer.addEventListener('click', (e) => {
                const chargeBtn = e.target.closest('.charge-client-btn');
                const deleteBtn = e.target.closest('.delete-client-btn');

                if (chargeBtn) {
                    const userId = chargeBtn.dataset.userid;
                    userIdInput.value = userId;
                    userIdInput.readOnly = true;
                    amountInput.value = '';
                    showChargeModal();
                    amountInput.focus();
                }

                if (deleteBtn) {
                    const userIdToDelete = deleteBtn.dataset.userid;
                    allClientsData = allClientsData.filter(client => client.userId !== userIdToDelete);
                    renderClients();
                    showNotification('Cliente eliminado.');
                }
            });

            accountsListContainer.addEventListener('click', (e) => {
                const deleteBtn = e.target.closest('.delete-account-btn');
                const toggleSwitch = e.target.closest('.account-toggle-switch');

                if (deleteBtn) {
                    const accountNumberToDelete = deleteBtn.dataset.accountnumber;
                    allAccountsData = allAccountsData.filter(acc => acc.accountNumber !== accountNumberToDelete);
                    renderAccounts();
                    showNotification('Cuenta eliminada.');
                }

                if (toggleSwitch) {
                    const accountNumberToToggle = toggleSwitch.dataset.accountnumber;
                    const account = allAccountsData.find(acc => acc.accountNumber === accountNumberToToggle);
                    if (account) {
                        account.isActive = toggleSwitch.checked;
                        const accountElement = toggleSwitch.closest('.flex.items-center.justify-between');
                         accountElement.classList.toggle('opacity-50', !account.isActive);
                    }
                }
            });

             keysListContainer.addEventListener('click', (e) => {
                const deleteBtn = e.target.closest('.delete-key-btn');
                if (deleteBtn) {
                    const keyToDelete = deleteBtn.dataset.key;
                    allKeysData = allKeysData.filter(keyData => keyData.key !== keyToDelete);
                    renderKeys();
                    showNotification('Llave eliminada.');
                }
            });

            // Lógica de Carga Masiva y Exportación
            const exportToExcel = () => {
                const filteredData = getFilteredCharges();
                if (filteredData.length === 0) {
                    showNotification('No hay datos para exportar con los filtros actuales.', 'error');
                    return;
                }
                const dataToExport = filteredData.map(charge => ({
                    'ID del Usuario': charge.userId,
                    'Monto': charge.amount,
                    'Estado': charge.status,
                    'Fecha y Hora': formatTimestamp(charge.timestamp),
                    'Fecha Programada': charge.scheduledDate ? formatDate(charge.scheduledDate) : ''
                }));

                const worksheet = XLSX.utils.json_to_sheet(dataToExport);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Historial de Cobros");
                XLSX.writeFile(workbook, "Historial_Cobros_Wepago.xlsx");
            };
            exportExcelBtn.addEventListener('click', exportToExcel);
            
            const downloadTemplate = () => {
                const templateData = [{ userId: 'ejemplo_user_1', amount: '15000,50', scheduledDate: '2025-09-20' }, { userId: 'ejemplo_user_2', amount: '25000', scheduledDate: '' }];
                const worksheet = XLSX.utils.json_to_sheet(templateData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Plantilla Cobros");
                XLSX.writeFile(workbook, "Plantilla_Cobros_Masivos.xlsx");
            };
            downloadTemplateBtn.addEventListener('click', downloadTemplate);

            importExcelInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = new Uint8Array(event.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        const json = XLSX.utils.sheet_to_json(worksheet);

                        if (json.length === 0) {
                            showNotification('El archivo Excel está vacío.', 'error');
                            return;
                        }

                        let importedCount = 0;
                        json.forEach(row => {
                            if (row.userId && row.amount) {
                                const cleanAmount = String(row.amount).replace(',', '.');
                                const amount = parseFloat(cleanAmount);
                                if (!isNaN(amount)) {
                                    const newCharge = {
                                        id: Date.now() + importedCount,
                                        userId: String(row.userId),
                                        amount: amount,
                                        timestamp: new Date()
                                    };
                                    
                                    if (row.scheduledDate) {
                                        const scheduled = new Date(row.scheduledDate + 'T00:00:00');
                                        const today = new Date();
                                        today.setHours(0,0,0,0);
                                        if (!isNaN(scheduled.getTime()) && scheduled > today) {
                                            newCharge.status = 'Programado';
                                            newCharge.scheduledDate = scheduled;
                                        } else {
                                            newCharge.status = 'Pendiente';
                                        }
                                    } else {
                                        newCharge.status = 'Pendiente';
                                    }

                                    allChargesData.unshift(newCharge);
                                    importedCount++;
                                }
                            }
                        });

                        if (importedCount > 0) {
                            applyFiltersAndRender();
                            navigateTo('history');
                            showNotification(`${importedCount} cobros importados exitosamente.`);
                        } else {
                             showNotification('No se importaron cobros. Verifique el formato del archivo.', 'error');
                        }

                    } catch (error) {
                        console.error("Error al importar el archivo:", error);
                        showNotification('Error al leer el archivo Excel.', 'error');
                    } finally {
                        importExcelInput.value = ''; // Reset input para poder cargar el mismo archivo de nuevo
                    }
                };
                reader.readAsArrayBuffer(file);
            });

            editPaymentMethodsBtn.addEventListener('click', () => {
                isEditingPaymentMethods = !isEditingPaymentMethods;

                if (!isEditingPaymentMethods) { // Si se está guardando
                    const inputs = paymentMethodsList.querySelectorAll('.edit-commission');
                    inputs.forEach(input => {
                        const index = input.dataset.index;
                        paymentMethodsData[index].commission = input.value;
                    });
                     showNotification('Comisiones actualizadas.');
                }
                
                editPaymentMethodsBtn.textContent = isEditingPaymentMethods ? 'Guardar' : 'Editar';
                editPaymentMethodsBtn.classList.toggle('bg-green-500', isEditingPaymentMethods);
                editPaymentMethodsBtn.classList.toggle('text-white', isEditingPaymentMethods);
                editPaymentMethodsBtn.classList.toggle('bg-blue-100', !isEditingPaymentMethods);
                editPaymentMethodsBtn.classList.toggle('text-blue-600', !isEditingPaymentMethods);
                
                renderPaymentMethods();
            });
        });
    </script>
</body>
</html>

