import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  message: {
    Lemo: '雷摩电子',
    login: '登录',
    title: '智能路灯管理平台',
    forget: '忘记密码？',
    account: '账户:',
    password: '密码:',
    remember_password: '记住密码',
    verification_code: '验证码:',
    language: '语言:',
    success: '验证成功',
    error: '无效用户名或密码',
    Verification_code_err: '验证码错误',
    write_username: '请输入用户名',
    write_password: '请输入密码',
    write_verification_code: '请输入验证码',
    email_passsword: '通过邮箱或手机找回密码',
    retrieve: '找回密码',
    mailbox: '邮箱/手机:',
    phone_email: '请输入邮箱地址或手机号',
    phone_emails: '请输入正确的手机号或邮箱',
    // 'mail: '发送邮件'
    Go_mailbox: '前往邮箱',
    new_password: '新密码',
    confirm_new_password: '确认新密码',
    reset_Password: '重置密码',
    loading_message: '拼命加载中',
    getCode: '获取验证码',
    phone: '客服电话'
  },
  hint: {
    choose: '一次只能选取一个',
    choose_task: '选取一个任务',
    hint_message: '此操作将永久删除该项目, 是否继续',
    task_message: '此操作将永久删除该任务, 是否继续',
    success: '删除成功',
    info: '已取消删除',
    prompt: '提示',
    clickRemove: '点击删除该项目',
    clickEditProject: '点击编辑该项目',
    clickToDtuList: '点击查看该项目的设备',
    clickAddDtu: '点击添加DTU',
    clickToAlarmList: '点击查看告警信息'
    // rtuLength: '最多只能同时选择4个路灯'
  },
  inputMessage: {
    tip: '提示：点击地图增加标注，经纬度会自动填入',
    name: '请输入名称'
  },
  remove: {
    message: '是否删除DTU相关信息'
  },
  nav: {
    light: '点击进入太阳能路灯管理页面',
    wifi: 'WiFi功能\n该功能暂未开放',
    camera: '摄像头功能\n该功能暂未开放',
    ad: '广告牌功能\n该功能暂未开放',
    char: '充电桩功能\n该功能暂未开放',
    environ: '环境检测功能\n该功能暂未开放',
    textTag: {
      streetLamp: '智能路灯',
      wifi: 'Wifi管理',
      camera: '视频监控',
      advertising: '广告管理',
      charging: '充电桩管理',
      environmental: '环境监测',
      notopen: '该功能暂未开放',
      click: '点击进入'
    }
  },
  navList: {
    ProjectManagement: '项目管理',
    EquipmentMonitoring: '设备监控',
    Task: '任务中心',
    Data: '数据管理',
    User: '用户管理',
    log: '日志管理',
    equipment: '设备维护',
    Advertising: '广告管理',
    System: '系统设置',
    returnNav: '返回导航'
  },
  project_group: {
    ProjectList: '项目列表',
    Street_lamp_management: '路灯管理',
    DeviceCenter: '设备中心'
  },
  equipment: {
    warnList: '报警列表',
    Alarm_Settings: '报警设置'
  },
  Advertising: {
    Ad_list: '广告管理'
  },
  // 项目列表
  project_list: {
    project_name: '项目名称',
    map_type: '地图类型',
    country: '国家',
    province: '省',
    city: '市',
    timezone: '时区',
    autoalarm: '报警超时时间',
    name: '用户',
    address: '操作',
    baiduMap: '百度地图',
    googleMap: '谷歌地图',
    delete: '删除',
    modify: '修改',
    add: '添加DTU',
    compile: '点击编辑此项目'
  },
  // 路灯模板
  Street_lamp_management: {
    model: '路灯型号',
    Solar_panel_power: '太阳能板功率',
    battery_capacity: '电池容量',
    Output_lumen: '输出流明',
    Lighting_PV_voltage: '亮灯PV电压',
    type_of_battery: '电池类型',
    Charge_voltage: '均充电压',
    Float_voltage: '浮充电压',
    Undervoltage_protection: '欠压保护',
    Voltaje_de_recuperación: '恢复电压',
    Energy_management: '能量管理',
    Temperature_compensation: '温度补偿',
    Derating_start_voltage: '降额开始电压',
    Derating_end_voltage: '降额结束电压'
  },
  EquipmentMonitoring: {
    StatusList: '状态列表',
    GIS: 'GIS地图监控'
  },
  StatusList: {
    rtuStatus: 'RTU态势',
    num: '个',
    online: '在线',
    offline: '离线',
    fault: '异常',
    status: '状态',
    pvvoltage: 'PV电压',
    bvoltage: '蓄电池电压',
    ovoltage: '输出电压',
    ocurrent: '输出电流',
    ccurrent: '充电电流',
    cpower: '充电功率',
    dcpower: '放电功率',
    temperature: '温度',
    itemperature: '设备温度',
    interior: '内部温度',
    external: '外部温度',
    state: '在线状态',
    motor: '电机启动次数',
    warn: '警告',
    daysolar: '日发电量',
    totalsolar: '总发电量',
    worktime: '工作时间',
    realtime: '实时查询',
    statusArr: ['机器关机', '机器待机', '充电待机', 'MPPT充电', '恒压均充', '恒压浮充', '驱动待机', '恒流驱动', ''],
    warnArr: ['正常', 'PV电压高', 'PV内部过压', '电池电压高', '电池电压低', '无电池', 'LED 限流模式', 'EEPROM错误', '亮灯时间到', '内部过温', '输出故障', '电池反向', '电池电压等级异常'],
    dtu: '集中器(DTU)名称',
    look: '批量查询'
  },
  task: {
    Task_Assignment: '任务分配',
    taskType: '任务类型',
    dateZone: '日期范围',
    carried_out: '是否执行',
    last_time: '最后执行时间',
    Conditional: '条件任务',
    Configuration: '配置任务',
    AI: 'AI云任务',
    month: '月份'
  },
  data: {
    LightData: '路灯数据',
    historical_data: '历史数据',
    DTU_list: 'DTU列表'
  },
  // DTU列表
  DTU_list: {
    name: 'DTU名称',
    ID: 'ID',
    project: '项目',
    Version: '版本序号',
    The_sampling_period: '采样周期',
    Heartbeat: '心跳周期',
    Remarks: '备注'
  },
  log: {
    system: '系统日志',
    Backstage: '后台日志'
  },
  // 系统列表
  system: {
    Operation_object: '操作对象',
    Operation_name: '操作名称',
    Operation_type: '操作类型',
    date: '时间',
    description: '描述',
    Username: '用户名',
    IP: 'IP',
    project: '项目',
    Concentrator: '集中器',
    Concentrator_Tel: '集中器 Tel',
    User_action: '用户操作',
    Hardware_operation: '硬件操作',
    Software_operation: '软件操作',
    obj: {
      All: '全部',
      project: '项目',
      user: '用户',
      Concentrator: '集中器',
      terminal: '终端',
      Mission_strategy: '任务策略',
      area: '区域',
      camera: '摄像头',
      Wifi_hotspot: 'Wifi热点',
      billboard: '广告牌',
      firmware: '固件'
    },
    recording: '执行记录'
  },
  // 路灯列表
  lightList: {
    Lead_batteries: '铅酸电池',
    lithium: '锂电池',
    Disable: '不使能',
    Mode_one: '模式一',
    Mode_two: '模式二',
    LampControl: '灯具控制',
    lightList: '路灯列表',
    terminal: '路灯终端',
    parameter: '路灯终端参数',
    Concentrador: '集中器',
    zibzee: 'Zibgee 通信',
    UID: 'UID',
    Tel: 'Tel',
    name: '名称',
    Clean_up: '清扫',
    longitude: '经度',
    latitude: '纬度',
    Street_lamp_model: '路灯型号',
    Drive_mode: '驱动模式',
    Drive_current: '驱动电流',
    period: '时段',
    First_period: '第一时段',
    two_period: '第二时段',
    three_period: '第三时段',
    four_period: '第四时段',
    five_period: '第五时段',
    Dimming_ratio: '调光比例',
    NoDimming_ratio: '无人调光比例',
    Someone: '有人调光比例',
    person: '有人',
    induction: '感应时段',
    Delay: '延时时间',
    Percentage_of_people: '有人百分比',
    Percentage_of_unmanned: '无人百分比',
    Morning_hours: '晨亮时段',
    Morning_light_ratio: '晨亮比例',
    time: '时长'
  },
  // GIS地图监控
  GPRS: {
    GPRS: 'GPRS 通信',
    Broadcas: '广播模式',
    duration: '持续时间',
    Full_open: '全开',
    All_off: '全关',
    Fully_automatic: '全自动',
    adjust: '调节',
    Clean_all: '全部清扫',
    Turn_lights: '开灯',
    off_lights: '关灯',
    automatic: '自动',
    brightness: '亮度'
  },
  // 报警列表
  warnList: {
    alarm_type: '报警类型',
    position: '位置',
    detailed: '详细',
    status: '状态',
    frequency: '次数',
    time: '时间',
    project: '项目',
    Concentrator: '集中器',
    state: ['全部', '未处理', '已忽略', '已分配', '已处理', '处理失败'],
    state2: ['未处理', '已忽略', '已分配', '已处理', '处理失败'],
    types: ['通信故障', 'PV电压高', 'PV内部过压', '电池电压高', '电池电压低', '无电池', 'LED 限流模式', 'EEPROM错误', '输出时间到', '内部过温', '输出故障', '电池反向', '电池电压等级异常', 'PV反接', '灯具拆卸'],
    unfinish: '未完成',
    finished: '已完成',
    history: '历史列表',
    distribution: '分配处理',
    alarm: '警报',
    deal_with: '处理',
    Deadline: '完成最后期限',
    Precautions: '处理注意事项',
    process_result: '处理结果',
    Processing_time: '处理时间'
  },
  // 节目列表
  ad_list: {
    Material_name: '素材名称',
    file_type: '文件类型',
    File_size: '文件大小',
    Play_time: '播放时长',
    Features: '功能'
  },
  search: {
    country_please: '请选择国家',
    province_please: '请选择地区',
    city_please: '请选择城市',
    keyword: '请输入关键词',
    search: '搜索',
    reset: '重置',
    add: '添加',
    set: '编辑',
    project_add: '项目添加',
    project_name: '项目名称',
    provinceFirst: '请先选择国家和省份',
    countryFirst: '请先选择国家',
    map_type: '地图类型',
    please: '请选择',
    country: '国家',
    province: '省份',
    city: '城市',
    timeZone: '时区',
    autoAlarm: '超时报警提醒',
    lightType: '路灯类型',
    confirm: '确定',
    cancel: '取消',
    null: '糟糕！没有符合的数据',
    keyword_lamp: '请输入路灯型号进行搜索',
    nullMessage: '无相关项目信息'
  },
  tips: {
    keyword: '请输入关键词',
    device_search: '设备搜索',
    device_list: '设备列表',
    Current_project: '当前项目',
    please: '请选择',
    country: '国家',
    province: '省份',
    city: '城市',
    timeZone: '时区',
    autoAlarm: '超市报警提醒',
    lightType: '路灯类型',
    confirm: '确定',
    cancel: '取消',
    onlyOne: '一次只能选取一个',
    noNull: '请选取一个任务',
    sureToDelete: '确定删除吗'
  },
  title: {
    Broadcas: 'DTU以广播的形式下发指令，不保证每个RTU都能正常收到指令'
  },
  dtu: '集中器',
  rtu: '路灯终端',
  concise: '简洁',
  big_screen: '大屏',
  view: '查看',
  Project_modification: '项目修改',
  Project_name: '项目名称',
  map_type: '地图类型',
  add: '添加',
  delete: '删除',
  edit: '编辑',
  addOrEdit: '添加或修改',
  selectAll: '全选',
  ReverseEelection: '反选',
  project: '项目',
  conditionTask: '条件任务',
  configTask: '配置任务',
  AITask: 'AI云任务',
  date: '日期',
  TaskName: '任务名称',
  TaskType: '任务类型',
  cycle: '周期',
  range: '范围',
  timeLimit: '日期范围',
  execute: '是否执行',
  lastExecuteTime: '最后执行时间',
  task_lighton: '开灯任务',
  task_lightoff: '关灯任务',
  task_energySaving: '节能模式',
  task_cleaning: '清扫任务',
  byDay: '按天',
  byWeek: '按周',
  byFrequency: '按次',
  adManagement: '广告管理',
  lightTypeList: '设置模板列表',
  tip: '提示',
  history: '历史',
  handle: '处理',
  ignore: '忽略',
  Positioning: '定位',
  Export: '导出xls文件',
  uploading: '上传xls文件',
  wranUpload: '上传格式不正确，请上传xls或者xlsx格式',
  currentPage: '当前页',
  alarmList: '报警列表',
  user: '用户',
  OperationOBJ: '操作对象',
  startDate: '开始日期',
  endDate: '结束日期',
  Dimming: '调光值',
  duration: '持续时间',
  select_date_start: '选择日期时间',
  select_date_end: '选择结束日期时间',
  executeTime: '执行时间',
  modify: '修改',
  operatename: ['用户添加', '用户删除', '用户修改', '用户登录',
    '调节亮度', '全开灯', '全关灯', '开灯', '关灯', '实时查询', // 4
    '添加项目', '删除项目', '修改项目', // 10
    '添加集中器', '删除集中器', '修改集中器', // 13
    '添加终端', '删除终端', '修改终端', '添加任务', // 16
    '删除任务', '修改任务', '添加任务应用', '删除任务应用', '修改任务应用', '下载任务', '取消任务', // 20
    '添加路灯类型', '编辑路灯类型', '删除路灯类型', // 27
    '添加角色', '编辑角色', '删除角色', // 30
    '参数更新', '区域更新', '添加区域', '删除区域', // 33
    '添加摄像头', '删除摄像头', '修改摄像头', // 37
    '添加Wifi热点', '删除Wifi热点', '修改Wifi热点', // 40
    '添加广告牌', '删除广告牌', '修改广告牌', // 43
    '全体自动', '自动', '下载固件', '更新固件' // 46
  ],
  types: ['通信故障', 'PV电压高', 'PV内部过压', '电池电压高', '电池电压低', '无电池', 'LED 限流模式', 'EEPROM错误', '输出时间到', '内部过温', '输出故障', '电池反向', '电池电压等级异常', 'PV反接', '灯具拆卸'],
  state: ['未执行', '成功', '失败'],
  task_mode: {
    cycle: '周期',
    range: '范围',
    Dimming: '调光值',
    Less_than: '电池电压小于',
    street_lights: '路灯数超过',
    date: '选择日期时间',
    date2: '选择结束日期时间',
    execution: '执行时间',
    End: '结束时间',
    mode: ['普通模式', '延时感应模式', '整晚感应模式', '晨亮模式'],
    light: ['开灯任务', '关灯任务', '节能模式', '清扫任务'],
    cycles: ['按天', '按周', '按次']
  },
  rules: {
    message: '请输入相关信息',
    longitude: '请输入经度',
    latitude: '请输入纬度',
    _id: '请输入UID',
    phoneNo: '请输入phone No',
    poll: '请输入心跳周期',
    sendtime: '请输入采样周期',
    typeId: '请输入路灯型号',
    mode: '请输入驱动模式',
    time1: '请输入第一时段',
    starttime: '请输入开始时间',
    endtime: '请输入结束时间',
    startSecond: '请输入任务起始日期',
    endSecond: '请输入任务截止日期',
    cycle: '请输入名称',
    enabled: '请选择计划是否生效',
    name: '请输入名称',
    country: '请选择国家',
    map_type: '请选择地图类型',
    province: '请选择省份',
    city: '请选择城市',
    timezoneoffset: '请选择时区',
    autoalarm: '请输入超时报警提醒',
    lightType: '请选择路灯类型'
  },
  peopel_list: {
    list: '维修人员列表',
    information: '维修人员信息',
    add_people: '添加维修人员',
    people: '维修人员',
    SMS: '开启短信提示',
    phone: '电话',
    project: '项目选择',
    Reset: '重置',
    email: '邮箱',
    address: '请输入邮箱地址',
    address2: '请输入正确的邮箱地址',
    save: '保存'
  },
  areaFrom: {
    area: '区域',
    area_name: '区域名称',
    area_number: '区域编号',
    description: '描述',
    Street_light: '路灯终端',
    create: '创建',
    save: '保存',
    ipt_name: '请输入区域名称',
    ipt_number: '请输入区域编号',
    ipt_light: '请选择路灯终端',
    ipt_type: '请输入路灯型号',
    ipt_node: '请输入驱动模式',
    ipt_time: '请输入第一时段'
  },
  // 地图弹框
  mapBox: {
    modification: '参数修改',
    Read_configuration: '读取配置',
    Update_light: '更新路灯终端',
    Get_controller: '获取控制器版本',
    Update_concentrator: '更新集中器终端',
    Add_area: '添加区域',
    Add_concentrator: '添加集中器',
    Street_lightings: '路灯设备组',
    Add_street_light: '添加路灯终端',
    parameter: '参数',
    database: '数据库',
    equipment: '设备',
    Battery_parameters: '电池参数',
    Project_positioning: '项目定位'
  },
  stateMessage: {
    addSuccess: '添加成功',
    alterSuccess: '修改成功'
  },
  large: {
    Online: '在线',
    Offline: '离线',
    Not_used: '未起用',
    malfunction: '故障',
    normal: '正常',
    Warning: '预警',
    DTU_situation: 'DTU态势',
    Total_number: '项目总数',
    DTU_total: 'DTU总数',
    RTU_situation: 'RTU态势',
    RTU_total: 'RTU总数',
    Police_Situation: '警情态势',
    date: '日发电',
    mouth: '月发电',
    charging: '充电桩'
  },
  wifi: {
    add: '添加wifi'
  },
  sensor: {
    add: '添加环境监测'
  },
  camera: {
    add: '添加摄像头'
  },
  DataLight: {
    endTime: '截止时间',
    line: '折线图',
    bar: '柱状图',
    echartsType: '图表类型',
    echartsPlaceholderType: '请选择图表类型',
    timeType: '时间类型',
    placeholderType: '请选择时间类型',
    mouth: '月',
    year: '年',
    placeholderTime: '请选择时间',
    fault: '故障',
    electric: '发电量',
    stateMotor: '正常:0 电池电压达不到启动值:1 故障:2  手动电机工作中:3 早晨清扫工作中:4 傍晚清扫工作中:5 手动清扫完成:6 早晨清扫完成:7 傍晚清扫完成:8',
    ElectricityStatistics: '太阳能发电量统计',
    faultStatistics: '故障率统计',
    dtuList: 'dtu 数据列表',
    lightStatistics: '路灯数据统计',
    dataList: '数据列表',
    dataType: '数据类型',
    placeholderDataType: '请选择数据类型',
    selectTime: '选择时间'
  },
  // mqtt消息返回状态
  mqttStatus: {
    send: ['待发送', '已发送,等待回复', '操作成功', '操作失败', '请求超时，请重新请求'],
    claerStatus: ['待发送', '已发送,等待回复', '操作成功', '操作失败', '电机正常', '电压不够', '电机故障', '手动清扫工作中', '早晨清扫工作中', '傍晚清扫工作中', '手动清扫完成', '早晨清扫完成', '傍晚清扫完成'],
    release: '该设备正被其他用户控制中,是否强制释放权限',
    privilegeStatus: ['获取权限中', '获得控制权限', '获得权限失败', '释放权限', 'DTU离线,等待重连']
  },
  ...zhLocale
}
export default cn