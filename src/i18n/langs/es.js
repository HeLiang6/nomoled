import esLocale from 'element-ui/lib/locale/lang/es'

const es = {
  message: {
    Lemo: 'Electrónica Lemo',
    login: 'Inicio',
    title: 'Plataforma inteligente de gestión de alumbrado público',
    forget: 'contraseña olvidada',
    account: 'cuenta:',
    password: 'Contraseña:',
    remember_password: 'Recordar contraseña',
    verification_code: 'Código de verificación:',
    language: 'Idioma:',
    success: 'Verificado con éxito',
    error: 'usuario o contraseña invalido',
    Verification_code_err: 'Error de código de verificación',
    write_username: 'por favor ingrese el nombre de usuario',
    write_password: 'Por favor, ingrese contraseña',
    write_verification_code: 'por favor ingrese el código de verificación',
    retrieve: 'Recuperar Contraseña',
    mailbox: 'buzón:',
    phone_email: 'Ingrese su dirección de correo electrónico o número de teléfono',
    phone_emails: 'Ingrese el número de teléfono o correo electrónico correcto',
    // 'mail: 'enviar correo electrónico'
    email_passsword: 'Recuperar contraseña por correo electrónico o teléfono móvil',
    Go_mailbox: 'Ir al buzón',
    new_password: 'nueva contraseña',
    confirm_new_password: 'Confirma la nueva contraseña',
    reset_Password: 'restablecer la contraseña',
    loading_message: 'Cargando desesperadamente',
    getCode: 'Obtener código de verificación',
    phone: 'Teléfono de atención al cliente'

  },
  hint: {
    choose: 'Solo se puede seleccionar uno a la vez',
    choose_task: 'Seleccionar una tarea',
    hint_message: 'Esta operación eliminará permanentemente el elemento, ¿quieres continuar?',
    task_message: 'Esta operación eliminará permanentemente la tarea, ¿quieres continuar?',
    success: 'Eliminar correctamente',
    info: 'No eliminado',
    prompt: 'rápido',
    clickRemove: 'Haga clic para eliminar el elemento',
    clickEditProject: 'Pulse en editar el elemento',
    clickToDtuList: 'Pulse en la lista de dispositivos',
    clickAddDtu: 'Pulse para añadir DTU',
    clickToAlarmList: 'Pulse en la lista de alarmas'
  },
  inputMessage: {
    tip: 'Sugerencia: haga clic en el mapa para agregar una etiqueta, la latitud y la longitud se completarán automáticamente'
  },
  remove: {
    message: 'Ya sea para eliminar la información relacionada con la DTU'
  },

  nav: {
    light: 'Farola solar',
    wifi: 'Wifi',
    camera: 'Cámara',
    ad: 'Cartelera',
    char: 'Pila de carga',
    environ: 'Detección ambiental',
    textTag: {
      streetLamp: 'Luz inteligente',
      wifi: 'WiFi Management',
      camera: 'Video Monitor',
      advertising: 'Anuncios Gestión',
      charging: 'Gestión de pilotes',
      environmental: 'Vigilancia ambiental',
      notopen: 'Esta función no se ha abierto',
      click: 'Pulse en entrar'
    }
  },
  navList: {
    ProjectManagement: 'Gestión de proyectos',
    EquipmentMonitoring: 'Lista de proyectos',
    Task: 'Centro de tareas',
    Data: 'Gestión de datos',
    User: 'Gestión de usuarios',
    log: 'Gestión de registros',
    equipment: 'Mantenimiento de equipo',
    Advertising: 'Gestión de publicidad',
    System: 'Ajustes del sistema',
    returnNav: 'Volver a la navegación'

  },
  project_group: {
    ProjectList: 'Project management',
    Street_lamp_management: 'Gestión de la iluminación pública',
    DeviceCenter: 'Centro de equipos'
  },
  equipment: {
    warnList: 'Lista de alarmas',
    Alarm_Settings: '报警设置'
  },
  Advertising: {
    Ad_list: 'Gestión de publicidad'
  },
  project_list: {
    project_name: 'nombre del proyecto',
    map_type: 'Tipo de mapa',
    country: 'país',
    province: 'provincia',
    city: 'ciudad',
    timezone: 'Zona horaria',
    autoalarm: 'Alarm timeout',
    name: 'usuario',
    address: 'operando',
    baiduMap: 'Mapa de Baidu',
    googleMap: 'Mapa de Google',
    delete: 'Eliminar',
    modify: 'modificar',
    add: 'Agregar DTU',
    compile: 'haga clic para editar este elemento'
  },
  Street_lamp_management: {
    model: 'Modelo de farola',
    Solar_panel_power: 'Energía del panel solar',
    battery_capacity: 'capacidad de la batería',
    Output_lumen: 'Lumen de salida',
    Lighting_PV_voltage: 'Voltaje fotovoltaico de iluminación',
    type_of_battery: 'tipo de batería,',
    Charge_voltage: 'Voltaje de carga',
    Float_voltage: 'Voltaje de flotación',
    Undervoltage_protection: 'Protección de subtensión',
    Voltaje_de_recuperación: 'Voltaje de recuperación',
    Energy_management: 'Gestión energética',
    Temperature_compensation: 'Compensación de temperatura',
    Derating_start_voltage: 'Reducción de voltaje de inicio',
    Derating_end_voltage: 'Reducción de voltaje final'
  },
  EquipmentMonitoring: {
    StatusList: 'Lista de estado',
    GIS: 'Monitoreo de mapas GIS'
  },
  StatusList: {
    rtuStatus: 'Situación RTU',
    num: 'UNA',
    online: 'Online',
    offline: 'Desconectar',
    fault: 'Anomalía',
    status: 'Estado',
    pvvoltage: 'Voltaje de PV',
    bvoltage: 'Tensión de batería',
    ovoltage: 'Tensión de salida',
    ocurrent: 'Corriente de salida',
    ccurrent: 'Corriente de carga',
    cpower: 'Potencia de carga',
    dcpower: 'Potencia de descarga',
    temperature: 'Temperatura',
    itemperature: 'Temperatura del dispositivo',
    interior: 'Temperatura interna',
    external: 'Temperatura externa',
    state: 'Estado en línea',
    motor: 'Número de arranques',
    warn: 'Alarma',
    daysolar: 'Energía solar',
    totalsolar: 'Potencia total',
    worktime: 'Horario de trabajo',
    realtime: 'Consulta en tiempo real',
    statusArr: ['Apagado de la máquina', 'Máquina en espera', 'Carga en espera', 'Carga MPPT', 'Carga de ecualización de voltaje constante', 'Carga flotante de voltaje constante', 'Unidad en espera', 'Unidad de corriente constante', ''],
    warnArr: ['Normal', 'Voltaje PV alto', 'Voltaje PV bajo', 'Voltaje de la batería alto',
      'Voltaje de la batería bajo', 'Sin batería', 'Modo de limitación de corriente LED', 'EEPROM incorrecto',
      'Tiempo de salida', 'Temperatura interna alta', 'Falla de salida', 'Batería inversa',
      'Anomalía del nivel de voltaje de la batería'],
    dtu: 'Nombre del concentrador (DTU)',
    look: 'Consulta por lotes'
  },
  task: {
    Task_Assignment: 'Asignación de tareas',
    taskType: 'Tipo de tarea',
    dateZone: 'Rango de fechas',
    carried_out: 'Ya sea para ejecutar',
    last_time: 'Última hora de ejecución',
    Conditional: 'Tarea condicional',
    Configuration: 'Tarea de configuración',
    AI: 'Misión AI Cloud',
    month: 'mes'

  },
  data: {
    LightData: 'Datos de alumbrado público',
    historical_data: 'información histórica',
    DTU_list: 'Lista de DTU'
  },
  DTU_list: {
    name: 'Nombre de DTU',
    ID: 'CARNÉ DE IDENTIDAD',
    project: 'proyecto',
    Version: 'Número de versión',
    The_sampling_period: 'El período de muestreo',
    Heartbeat: 'Ciclo de latidos',
    Remarks: 'Observaciones'
  },
  log: {
    system: 'Registro del sistema',
    Backstage: 'Registro de antecedentes'
  },
  system: {
    Operation_object: 'Objeto de operación',
    Operation_name: 'Nombre de la operación',
    Operation_type: 'ipo de operación',
    date: 'hora',
    description: 'descripción',
    Username: 'nombre de usuario',
    IP: 'IP',
    project: 'proyecto',
    Concentrator: 'Concentrador',
    Concentrator_Tel: 'Concentrador Tel',
    User_action: 'Acción del usuario',
    Hardware_operation: 'Operación de hardware',
    Software_operation: 'Operación de software',
    obj: {
      All: 'firmware',
      project: 'proyecto',
      user: 'usuario',
      Concentrator: 'Concentrador',
      terminal: 'terminal',
      Mission_strategy: 'Estrategia de misión',
      area: 'zona',
      camera: 'cámara',
      Wifi_hotspot: 'Punto de acceso wifi',
      billboard: 'cartelera',
      firmware: 'firmware'
    },
    recording: 'Registro de ejecución'

  },
  // 路灯列表
  lightList: {
    Lead_batteries: 'Baterías de plomo ácido',
    lithium: 'Batería de Litio',
    Disable: 'Desactivar',
    Mode_one: 'Mode One',
    Mode_two: 'Modo dos',
    LampControl: 'Control de lámpara',
    lightList: 'Lista de farolas',
    parameter: 'Parámetros del terminal de farolas',
    terminal: 'Terminal de farolas',
    Concentrador: 'Concentrador',
    UID: 'UID',
    Tel: 'Tel',
    name: 'nombre',
    zibzee: 'Comunicación Zibgee',
    Clean_up: 'Limpiar',
    longitude: 'longitud',
    latitude: 'latitud',
    Street_lamp_model: 'Modelo de farola',
    Drive_mode: 'Modo conductor',
    Drive_current: 'Conducir la corriente',
    period: 'Periodo de tiempo',
    First_period: 'Primer periodo',
    two_period: 'Segundo período',
    three_period: 'Tercer periodo',
    four_period: 'Cuarto periodo',
    five_period: 'Quinto periodo',
    Dimming_ratio: 'Relación de atenuación',
    NoDimming_ratio: 'alguien está en Oscurecimiento',
    Someone: 'Proporción de atenuación de alguien',
    person: 'Alguien',
    induction: 'Periodo de inducción',
    Delay: 'Tiempo de retardo',
    Percentage_of_people: 'Porcentaje de personas',
    Percentage_of_unmanned: 'Porcentaje de no tripulados',
    Morning_hours: 'Horas de la mañana',
    Morning_light_ratio: 'Proporción de luz matutina',
    time: 'duración'

  },
  // GIS地图监控
  GPRS: {
    GPRS: 'Comunicación GPRS',
    Broadcas: 'Modo de transmisión',
    duration: 'duración',
    Full_open: 'Completamente abierto',
    All_off: 'Todo apagado',
    Fully_automatic: 'Completamente automatico',
    adjust: 'ajustar',
    Clean_all: 'Limpiar todo',
    Turn_lights: 'Encender',
    off_lights: 'Luces',
    automatic: 'Automático',
    brightness: 'Luminosidad'
  },
  // 报警列表
  warnList: {
    alarm_type: 'tipo de alarma',
    position: 'posición',
    detailed: 'detallado',
    status: 'estado',
    frequency: 'frecuencia',
    time: 'hora',
    project: 'proyecto',
    Concentrator: 'Concentrador',
    state: ['Todas', 'Sin control', 'Ignorado', 'Asignado', 'Control', 'Fallo de control'],
    state2: ['Sin control', 'Ignorado', 'Asignado', 'Control', 'Fallo de control'],
    types: ['Fallos de comunicación', 'Voltaje alto PV', 'Voltaje bajo PV', 'Voltaje alto de la batería ', 'Voltaje bajo de la batería', 'Sin Batería', 'Modo de limitación de corriente LED', 'EEPROM error', '输出时间到', 'Alta temperatura interna', 'Falla de salida', 'Batería inversa', 'Anomalía del nivel de voltaje de la batería', 'Reverso PV', 'Desmontaje de la lámpara'],
    unfinish: 'deshecho',
    finished: 'terminado',
    history: 'Lista de historial',
    distribution: 'Procesamiento de distribución',
    alarm: 'Alarma',
    deal_with: 'Deal',
    Deadline: 'Completa la fecha límite',
    Precautions: 'Precauciones de manipulación',
    process_result: 'Resultado de procesamiento',
    Processing_time: 'tiempo de procesamiento'

  },
  // 节目列表
  ad_list: {
    Material_name: 'Nombre del material',
    file_type: 'Tipo de archivo',
    File_size: 'Tamaño del archivo',
    Play_time: 'Tiempo de juego',
    Features: 'Caracteristicas'
  },
  search: {
    country_please: 'Seleccione un país',
    province_please: 'Seleccione una región',
    city_please: 'Seleccione una ciudad',
    keyword: 'Introduzca una palabra clave',
    search: 'buscar',
    reset: 'Sustitución',
    add: 'Agregar',
    set: 'Editar',
    project_add: 'Proyecto Agregar',
    project_name: 'Nombre del proyecto',
    provinceFirst: 'Seleccione primero el país y la provincia.',
    countryFirst: 'Seleccione primero el país.',
    map_type: 'Tipo de mapa',
    please: 'Seleccione',
    country: 'País',
    province: 'Provincia',
    city: 'Ciudad',
    timeZone: 'Zona horaria',
    autoAlarm: 'Recordatorio de alarma de horas extraordinarias',
    lightType: 'Street Light Type',
    confirm: 'OK',
    cancel: 'Cancelar',
    null: '¡Vaya! No hay datos coincidentes',
    keyword_lamp: 'Introducir palabras clave para la búsqueda',
    nullMessage: 'No hay información relacionada con el proyecto'
  },
  operatename: ['Usuario agregado', 'Borrado de usuario ', 'Editar usuario', 'Inicio de sesión de usuario',
    'Ajuste la ligereza', 'Todo iluminado encendido', 'Toda la iluminación encendido', 'Toda la iluminación apagado', 'luz apagada', 'Consulta en tiempo real', // 4
    'Agregar proyecto ', 'Proyecto borrado', 'Edición del proyecto', // 10
    'Agregar DTU ', 'Borrar DTU ', 'Editar DTU ', // 13
    'Agregar RTU ', 'Borrar RTU ', 'Editar RTU', 'Eliminar tarea', // 16
    'Eliminar tarea', 'Editar tarea', 'Agregar y aplicar tarea ', 'Aplicar tarea de borrado', 'Se aplica la tarea de edición', 'Descargar tarea', 'Cancelar tarea', // 20
    'Añadir tipo de luz', 'Editar tipo de luz', 'Eliminar tipo de luz', // 27
    'Agregar rol', 'Editar rol', 'Eliminar rol', // 30
    'Actualización de parámetros', 'Actualización de zona', 'Añadir zona ', 'Borrar Zona ', // 33
    'Agregar Cámara', 'Borrar Cámara', 'Editar Cámara', // 37
    'Agregar Wifi ', 'Borrar Wifi ', 'Editar Wifi ', // 40
    'Añadir cartelera', 'Borrar cartelera', 'Editar cartelera', // 43
    'Todo automático', 'Automático', 'Descargar fireware', 'Actualizar el sólido' // 46
  ],
  types: ['Fallos de comunicación', 'Voltaje alto PV', 'Voltaje bajo PV', 'Voltaje alto de la batería ', 'Voltaje bajo de la batería', 'Sin Batería', 'Modo de limitación de corriente LED', 'EEPROM error', 'Tiempo de salida', 'Alta temperatura interna', 'Falla de salida', 'Batería inversa', 'Anomalía del nivel de voltaje de la batería', 'Reverso PV', 'Desmontaje de la lámpara'],
  state: ['no ejecutado', 'éxito', 'fracaso'],
  task_mode: {
    cycle: 'ciclo',
    range: 'rango',
    Dimming: 'Valor de atenuación',
    Less_than: 'El voltaje de la batería es menor que',
    street_lights: 'Luces de calle excedidas',
    date: 'Seleccionar fecha y hora',
    date2: 'Seleccione la fecha y hora de finalización',
    execution: 'Tiempo de ejecución',
    End: 'Hora de finalización',

    mode: ['Modo normal', 'Modo de inducción retardada', 'Modo de inducción toda la noche', 'Modo luz de día'],
    light: ['Enciende la tarea ligera', 'Apagar la tarea de luz', 'Modo de ahorro de energía', 'borrado tarea'],
    cycles: ['Por día', 'Por semana', 'Para contar']
  },
  tips: {
    keyword: 'Introduzca la palabra clave',
    device_search: 'Búsqueda de dispositivo',
    device_list: 'Lista de dispositivos',
    Current_project: 'Proyecto actual',
    please: 'Vamos',
    country: 'Estados',
    province: 'Provincias',
    city: 'Ciudad',
    timeZone: 'Zona horaria',
    autoAlarm: 'Alarma automática',
    lightType: 'Tipo de lámpara',
    confirm: 'Confirmar',
    Cancelar: 'cancel',
    onlyOne: 'Sólo uno a la vez.',
    noNull: 'Seleccione una tarea.',
    sureToDelete: '¿Estás seguro?'
  },
  dtu: 'Concentrador',
  rtu: 'Terminal de luz de calle',
  conciso: 'conciso',
  big_screen: 'pantalla grande',
  vista: 'Ver',
  Project_modification: 'Modificación del proyecto',
  Project_name: 'Nombre del proyecto',
  map_type: 'Tipo de mapa',
  agregar: 'Agregar',
  eliminar: 'Eliminar',
  editar: 'Editar',
  addOrEdit: 'Agregar o modificar',
  selectAll: 'Seleccionar todo',
  ReverseEelection: 'Elección inversa',
  proyecto: 'Proyecto',
  conditionTask: 'Tarea de condición',
  configTask: 'Tarea de configuración',
  AITask: 'Tarea en la nube de IA',
  fecha: 'Fecha',
  TaskName: 'Nombre de la tarea',
  TaskType: 'Tipo de tarea',
  ciclo: 'Ciclo',
  rango: 'rango',
  timeLimit: 'Rango de fechas',
  ejecutar: 'Ya sea para ejecutar',
  lastExecuteTime: 'Última hora de ejecución',
  task_lighton: 'Tarea Lighton',
  task_lightoff: 'Tarea de luces apagadas',
  task_energySaving: 'Modo de ahorro de energía',
  task_cleaning: 'Tarea de limpieza',
  byDay: 'Por día',
  byWeek: 'Por semana',
  byFrequency: 'Tiempos de prensa',
  adManagement: 'Gestión de publicidad',
  lightTypeList: 'Establecer lista de plantillas',
  consejo: 'consejo',
  historia: 'Historia',
  manejar: 'Procesando',
  ignorar: 'Ignorar',
  Posicionamiento: 'Posicionamiento',
  Exportar: 'Exportar archivo xls',
  subiendo: 'Subir archivo xls',
  wranUpload: 'El formato de carga es incorrecto, cárguelo en formato xls o xlsx',
  currentPage: 'Página actual',
  alarmList: 'Lista de alarmas',
  usuario: 'Usuario',
  OperationOBJ: 'Objeto de operación',
  startDate: 'Fecha de inicio',
  endDate: 'Fecha de finalización',
  Atenuación: 'Valor de atenuación',
  duración: 'Duración',
  select_date_start: 'Seleccionar fecha y hora',
  select_date_end: 'Seleccione la fecha y hora de finalización',
  executeTime: 'tiempo de ejecución',
  modificar: 'Modificar',
  rules: {
    message: 'Introduzca información relevante',
    longitude: 'Por favor ingrese la longitud',
    latitude: 'Introduzca la latitud',
    _id: 'Ingrese UID',
    phoneNo: ' Introduzca el número de teléfono',
    poll: 'Introduzca el ciclo de latidos',
    sendtime: 'Introduzca el período de muestreo',
    typeId: 'Introduzca el modelo de farola',
    mode: 'Por favor ingrese al modo de manejo',
    time1: 'Introduzca el primer período de tiempo',
    starttime: 'Introduzca la hora de inicio',
    endtime: 'Introduzca la hora de finalización',
    startSecond: 'Introduzca la fecha de inicio de la tarea',
    endSecond: 'Introduzca la fecha límite de la tarea',
    cycle: 'Ingrese un nombre',
    enabled: 'Seleccione si el plan es efectivo',
    name: 'Introduzca un nombre',
    country: 'Seleccione un país',
    map_type: 'Seleccione el tipo de mapa',
    province: 'Seleccione una provincia',
    city: 'Seleccione una ciudad',
    timezoneoffset: 'Seleccione una zona horaria',
    autoalarm: 'Introduzca el recordatorio de alarma de tiempo de espera',
    lightType: 'Seleccione el tipo de alumbrado público'

  },
  title: {
    Broadcas: 'La dtu emite las instrucciones por radio, no garantiza que cada rtu reciba las instrucciones.'
  },
  stateMessage: {
    addSuccess: 'Agregar éxito',
    alterSuccess: 'modificado con éxito'

  },
  peopel_list: {
    list: 'Lista de personal de mantenimiento',
    information: 'Información del personal de mantenimiento',
    add_people: 'Agregar personal de mantenimiento',
    people: 'Personal de mantenimiento',
    SMS: 'Activar notificación por SMS',
    phone: 'Teléfono',
    project: 'Selección de proyecto ',
    Reset: 'Restablecer',
    email: 'Buzón',
    address: 'Introduzca su dirección de correo electrónico',
    adress2: 'Introduzca la dirección de correo electrónico correcta',
    save: 'Guardar'
  },
  areaFrom: {
    area: 'Área',
    area_name: 'Nombre del área',
    area_number: 'Número de área',
    description: 'Descripción',
    Street_light: 'Terminal de luz de calle',
    create: 'Crear',
    save: 'Guardar',
    ipt_name: 'Ingrese el nombre del área',
    ipt_number: 'Por favor ingrese el número de área',
    ipt_light: 'Por favor seleccione terminal de alumbrado público',
    ipt_type: 'Introduzca el modelo de farola',
    ipt_node: 'Ingrese al modo de manejo',
    ipt_time: 'Introduzca el primer período de tiempo'

  },

  // 地图弹框
  mapBox: {
    modification: 'Modificación de parámetros',
    Read_configuration: 'Leer configuración',
    Update_light: 'Actualizar terminal de alumbrado público',
    Get_controller: 'Obtener la versión del controlador',
    Update_concentrator: 'Actualizar terminal concentrador',
    Add_area: 'Agregar área',
    Add_concentrator: 'Agregar concentrador',
    Street_lightings: 'Grupo de equipos de alumbrado público',
    Add_street_light: 'Agregar terminal de alumbrado público',
    parameter: 'Parámetro',
    database: 'Base de datos',
    equipment: 'Equipo',
    Battery_parameters: 'Parámetros de la batería',
    Project_positioning: 'Posicionamiento del proyecto'
  },
  large: {
    Online: 'En línea',
    Offline: 'Fuera de línea',
    Not_used: 'No usado',
    malfunction: 'fallo',
    normal: 'normal',
    Warning: 'Advertencia',
    DTU_situation: 'Situación DTU',
    Total_number: 'Número total de artículo',
    DTU_total: 'DTU total',
    RTU_situation: 'Situación RTU',
    RTU_total: 'RTU total',
    Police_Situation: 'Situación policial',
    date: 'Generación de energía diaria',
    mouth: 'Generación de energía mensual',
    charging: 'Pila de carga'

  },
  wifi: {
    add: 'Agregar wifi'
  },
  sensor: {
    add: 'Agregar monitoreo ambiental'
  },
  camera: {
    add: 'Agregar cámara'
  },
  DataLight: {
    endTime: 'fecha límite',
    line: 'Gráfico de líneas',
    bar: 'Histograma',
    echartsType: 'Tipo de gráfico',
    echartsPlaceholderType: 'Seleccione el tipo de gráfico',
    timeType: 'Tipo de tiempo',
    placeholderType: 'Seleccione el tipo de hora',
    mouth: 'Mes',
    year: 'año',
    placeholderTime: 'Por favor, elija una hora',
    fault: 'Fallo',
    electric: 'Generación de energía',
    stateMotor: 'Normal: 0 La tensión de la batería no alcanza el valor inicial: 1 Fallo: 2 Motor manual en funcionamiento: 3 Trabajo de limpieza matutino: 4 Trabajo de limpieza vespertino: 5 Limpieza manual completada: 6 Limpieza matutina completada: 7 Limpieza nocturna completada: 8',
    ElectricityStatistics: 'Estadísticas de generación de energía solar',
    faultStatistics: 'Estadísticas de tasa de fallas',
    dtuList: 'lista de datos dtu',
    lightStatistics: 'Estadísticas de alumbrado público',
    dataList: 'Lista de datos',
    dataType: 'Tipo de datos',
    placeholderDataType: 'Seleccione el tipo de datos',
    selectTime: 'Seleccionar hora'

  },
  mqttStatus: {
    send: ['Esperando para enviar', 'Enviando, esperando contestacion', 'Operación exitosa', 'Operación con fallo', 'Tiempo extra,por favor.'],
    release: 'El dispositivo está siendo controlado por otros usuarios, ¿es obligatorio liberar permisos?',
    claerStatus: ['Esperando para enviar', 'Enviando, esperando contestacion', 'Operación exitosa', 'Operación con fallo', 'Motor es normal', 'Voltaje no es suficiente', 'Fallo del motor', 'Trabajo de limpieza manual', 'Trabajo de limpieza matutino', 'Trabajo de limpieza nocturno', 'Finalización de limpieza manual', 'Limpieza matutina completada', 'Tarde vespertina Limpieza completada'],
    privilegeStatus: ['Obteniendo permiso', 'Obteniendo permiso de control', 'Obteniendo permiso fallido', 'Liberar permiso ', ' DTU sin conexión, esperando reconexión ']

  },

  Export: 'Exportar archivo xls',
  uploading: 'Subir archivo xls',
  wranUpload: 'El formato de carga es incorrecto, cárguelo en formato xls o xlsx',

  ...esLocale
}
export default es
