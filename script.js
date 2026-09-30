// Estructura de datos completa de tu mapa de ruta personalizado
const roadmapData = [
    {
        title: "Fase 1: C++ Orientado a Microcontroladores",
        tasks: [
            { id: "f1_t1", title: "Clases y Objetos", desc: "Encapsular componentes y periféricos en entidades.", url: "https://cppreference.com" },
            { id: "f1_t2", title: "Constructores", desc: "Listas de inicialización aplicadas a asignación de pines.", url: "https://cppreference.com" },
            { id: "f1_t3", title: "Modificadores de acceso", desc: "Entender el uso de public, private y protected.", url: "https://cppreference.com" },
            { id: "f1_t4", title: "Punteros y Referencias", desc: "Manipular datos en RAM eficientemente sin duplicar objetos.", url: "https://cppreference.com" },
            { id: "f1_t5", title: "Miembros Estáticos (static)", desc: "Crear handlers y callbacks compatibles con el framework.", url: "https://cppreference.com" }
        ]
    },
    {
        title: "Fase 2: Periféricos y Arquitectura Nativa",
        tasks: [
            { id: "f2_t1", title: "Drivers GPIO Nativos", desc: "Configurar pines mediante la estructura gpio_config_t.", url: "https://espressif.com" },
            { id: "f2_t2", title: "ADC (Lectura Analógica)", desc: "Usar el módulo adc_oneshot para leer voltajes.", url: "https://espressif.com" },
            { id: "f2_t3", title: "PWM por Hardware", desc: "Dominar el periférico LEDC para controlar brillos o motores.", url: "https://espressif.com" },
            { id: "f2_t4", title: "Interrupciones (ISR)", desc: "Manejar eventos físicos en botones con código asíncrono.", url: "https://espressif.com#gpio-api-interrupt" },
            { id: "f2_t5", title: "Memoria No Volátil (NVS)", desc: "Guardar configuraciones persistentes en la memoria flash.", url: "https://espressif.com" }
        ]
    },
    {
        title: "Fase 3: El Sistema Operativo FreeRTOS",
        tasks: [
            { id: "f3_t1", title: "Creación de Tareas", desc: "Asignar bucles infinitos a núcleos específicos (Core 0 o 1).", url: "https://espressif.com" },
            { id: "f3_t2", title: "Planificador y Prioridades", desc: "Dominar cómo el Scheduler decide los tiempos de ejecución.", url: "https://freertos.org" },
            { id: "f3_t3", title: "Colas de Datos (Queues)", desc: "Pasar variables entre tareas de forma segura.", url: "https://freertos.org" },
            { id: "f3_t4", title: "Semáforos y Mutex", desc: "Sincronizar tareas y proteger periféricos compartidos.", url: "https://freertos.org" }
        ]
    },
    {
        title: "Fase 4: Conectividad e Internet de las Cosas (IoT)",
        tasks: [
            { id: "f4_t1", title: "Manejo de Eventos Wi-Fi", desc: "Entender el flujo asíncrono de conexión (STA Mode).", url: "https://espressif.com" },
            { id: "f4_t2", title: "Servidor Web Nativo (HTTPD)", desc: "Levantar páginas web locales directo en el chip.", url: "https://espressif.com" },
            { id: "f4_t3", title: "Cliente HTTP", desc: "Consumir datos de APIs públicas desde internet.", url: "https://espressif.com" },
            { id: "f4_t4", title: "Protocolo MQTT", desc: "Enviar telemetría en tiempo real a brokers como Adafruit o AWS.", url: "https://espressif.com" }
        ]
    }
];

// Gestionar el cambio de estado de cada check
function toggleTask(id) {
    const checkbox = document.getElementById(id);
    const itemLabel = document.getElementById('label_' + id);
    
    if (checkbox && itemLabel) {
        if (checkbox.checked) {
            itemLabel.classList.add('completed');
            localStorage.setItem(id, 'true');
        } else {
            itemLabel.classList.remove('completed');
            localStorage.setItem(id, 'false');
        }
    }
    updateProgressBar();
}

// Calcular progreso general de la barra superior
function updateProgressBar() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const total = checkboxes.length;
    let checkedCount = 0;
    
    checkboxes.forEach(cb => {
        if (cb.checked) checkedCount++;
    });
    
    const percentage = total > 0 ? Math.round((checkedCount / total) * 100) : 0;
    
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-percentage');
    
    if (fill && text) {
        fill.style.width = percentage + '%';
        text.innerText = percentage + '%';
    }
}

// Dibujar la interfaz dinámica al cargar el navegador
window.onload = function() {
    const wrapper = document.getElementById('phases-wrapper');
    if (!wrapper) return;

    roadmapData.forEach(phase => {
        const card = document.createElement('div');
        card.className = 'phase-card';
        
        let html = '<h2 class="phase-title">' + phase.title + '</h2>';
        
        phase.tasks.forEach(task => {
            html += '<div class="task-row">' +
                        '<label class="task-item" id="label_' + task.id + '">' +
                            '<input type="checkbox" id="' + task.id + '" onchange="toggleTask(\'' + task.id + '\')">' +
                            '<div class="task-text">' +
                                '<span class="task-title">' + task.title + '</span>' +
                                '<div class="task-desc">' + task.desc + '</div>' +
                                '</div>' +
                        '</label>' +
                        '<a href="' + task.url + '" target="_blank" class="doc-link">Teoría ↗</a>' +
                    '</div>';
        });
        
        card.innerHTML = html;
        wrapper.appendChild(card);
    });

    // Recuperar el almacenamiento local (LocalStorage)
    roadmapData.forEach(phase => {
        phase.tasks.forEach(task => {
            const saved = localStorage.getItem(task.id);
            if (saved === 'true') {
                const checkbox = document.getElementById(task.id);
                const itemLabel = document.getElementById('label_' + task.id);
                if (checkbox && itemLabel) {
                    checkbox.checked = true;
                    itemLabel.classList.add('completed');
                }
            }
        });
    });

    updateProgressBar();
};
