#!/usr/bin/env python3
"""Genera la guía de estudio CCST Cybersecurity en PDF con formato profesional."""

from pathlib import Path

from fpdf import FPDF

FONTS = Path("/usr/share/fonts/truetype/noto")
OUT = Path(__file__).resolve().parent / "CCST-Cybersecurity-Guia-Estudio.pdf"

# Paleta
NAVY = (15, 39, 68)
TEAL = (0, 112, 121)
SLATE = (45, 55, 72)
MUTED = (90, 103, 120)
LIGHT = (241, 245, 249)
ACCENT_BG = (232, 244, 245)
WHITE = (255, 255, 255)
ORANGE = (180, 83, 9)
GREEN = (21, 128, 61)


class GuidePDF(FPDF):
    def __init__(self):
        super().__init__(format="A4", unit="mm")
        self.set_auto_page_break(auto=True, margin=18)
        self.add_font("Noto", "", str(FONTS / "NotoSans-Regular.ttf"))
        self.add_font("Noto", "B", str(FONTS / "NotoSans-Bold.ttf"))
        self.add_font("Noto", "I", str(FONTS / "NotoSans-Italic.ttf"))
        self.add_font("Noto", "BI", str(FONTS / "NotoSans-BoldItalic.ttf"))
        self.add_font("Serif", "", str(FONTS / "NotoSerif-Regular.ttf"))
        self.add_font("Serif", "B", str(FONTS / "NotoSerif-Bold.ttf"))
        self.add_font("Serif", "I", str(FONTS / "NotoSerif-Italic.ttf"))

    def header(self):
        if self.page_no() == 1:
            return
        self.set_y(8)
        self.set_font("Noto", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 5, "CCST Cybersecurity · Guía de estudio", align="L")
        self.set_x(self.l_margin)
        self.cell(0, 5, "Material de práctica", align="R")
        self.ln(4)
        self.set_draw_color(*TEAL)
        self.set_line_width(0.4)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(6)

    def footer(self):
        if self.page_no() == 1:
            return
        self.set_y(-14)
        self.set_draw_color(*LIGHT)
        self.set_line_width(0.3)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(2)
        self.set_font("Noto", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 6, f"{self.page_no() - 1}", align="C")

    def cover(self):
        self.add_page()
        # Fondo superior
        self.set_fill_color(*NAVY)
        self.rect(0, 0, self.w, 118, "F")
        self.set_fill_color(*TEAL)
        self.rect(0, 118, self.w, 4, "F")

        self.set_y(36)
        self.set_font("Noto", "", 11)
        self.set_text_color(160, 210, 214)
        self.cell(0, 8, "CISCO CERTIFIED SUPPORT TECHNICIAN", align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(4)
        self.set_font("Serif", "B", 32)
        self.set_text_color(*WHITE)
        self.multi_cell(0, 14, "CCST Cybersecurity", align="C")
        self.ln(2)
        self.set_font("Noto", "", 14)
        self.set_text_color(210, 230, 235)
        self.multi_cell(
            0,
            8,
            "Guía de estudio: 21 preguntas probables,\nrespuestas y explicaciones",
            align="C",
        )

        self.set_y(145)
        self.set_font("Noto", "B", 12)
        self.set_text_color(*NAVY)
        self.cell(0, 8, "Objetivo", align="C", new_x="LMARGIN", new_y="NEXT")
        self.set_font("Noto", "", 11)
        self.set_text_color(*SLATE)
        self.set_x(25)
        self.multi_cell(
            self.w - 50,
            6.5,
            "Repasar conceptos fundamentales de ciberseguridad mediante "
            "preguntas situacionales, respuestas y explicaciones.",
            align="C",
        )

        self.ln(10)
        # Nota en caja
        note = (
            "Nota: Las introducciones se conservan según el texto proporcionado. "
            "Los enunciados completos y las respuestas son reconstrucciones "
            "probables, no preguntas oficiales verificadas. Cuando el fragmento "
            "no permite determinar una respuesta única, se indican las "
            "posibilidades que debes estudiar."
        )
        self._info_box(note, y=self.get_y())

        self.set_y(250)
        self.set_font("Noto", "", 9)
        self.set_text_color(*MUTED)
        self.cell(0, 6, "Material de práctica · No es un banco oficial de Cisco", align="C")

    def _info_box(self, text, y=None, fill=ACCENT_BG, border=TEAL):
        if y is not None:
            self.set_y(y)
        x = self.l_margin
        w = self.w - self.l_margin - self.r_margin
        self.set_font("Noto", "I", 9)
        # Calcular altura
        lines = self.multi_cell(w - 10, 5, text, dry_run=True, output="LINES")
        h = 8 + len(lines) * 5
        if self.get_y() + h > self.h - 20:
            self.add_page()
        y0 = self.get_y()
        self.set_fill_color(*fill)
        self.set_draw_color(*border)
        self.set_line_width(0.3)
        self.rect(x, y0, w, h, "DF")
        self.set_xy(x + 5, y0 + 4)
        self.set_text_color(*SLATE)
        self.multi_cell(w - 10, 5, text)
        self.set_y(y0 + h + 4)

    def section_title(self, number, title):
        if self.get_y() > self.h - 50:
            self.add_page()
        self.ln(2)
        # Barra de título
        y = self.get_y()
        self.set_fill_color(*NAVY)
        self.rect(self.l_margin, y, self.w - self.l_margin - self.r_margin, 11, "F")
        self.set_xy(self.l_margin + 3, y + 2.2)
        self.set_font("Noto", "B", 10)
        self.set_text_color(*WHITE)
        label = f"{number}. {title}" if number else title
        self.cell(0, 7, label)
        self.set_y(y + 14)

    def subsection(self, title, color=TEAL):
        if self.get_y() > self.h - 30:
            self.add_page()
        self.set_font("Noto", "B", 10)
        self.set_text_color(*color)
        self.cell(0, 7, title, new_x="LMARGIN", new_y="NEXT")

    def body(self, text):
        self.set_font("Noto", "", 10)
        self.set_text_color(*SLATE)
        self.multi_cell(0, 5.5, text)
        self.ln(1.5)

    def italic_body(self, text):
        self.set_font("Noto", "I", 9.5)
        self.set_text_color(*MUTED)
        self.multi_cell(0, 5.2, text)
        self.ln(1.5)

    def answer_box(self, label, text, color=GREEN):
        if self.get_y() > self.h - 28:
            self.add_page()
        w = self.w - self.l_margin - self.r_margin
        self.set_font("Noto", "B", 9)
        prefix = f"{label}: "
        # altura
        self.set_font("Noto", "", 10)
        lines = self.multi_cell(w - 8, 5.2, prefix + text, dry_run=True, output="LINES")
        h = 6 + len(lines) * 5.2
        y0 = self.get_y()
        self.set_fill_color(236, 253, 245) if color == GREEN else self.set_fill_color(255, 247, 237)
        fill = (236, 253, 245) if color == GREEN else (255, 247, 237)
        self.set_fill_color(*fill)
        self.set_draw_color(*color)
        self.set_line_width(0.5)
        self.rect(self.l_margin, y0, w, h, "D")
        # barra lateral
        self.set_fill_color(*color)
        self.rect(self.l_margin, y0, 1.8, h, "F")
        self.set_xy(self.l_margin + 4, y0 + 2.5)
        self.set_font("Noto", "B", 9)
        self.set_text_color(*color)
        self.write(5.2, prefix)
        self.set_font("Noto", "", 10)
        self.set_text_color(*SLATE)
        self.write(5.2, text)
        self.ln(5.2)
        self.set_y(y0 + h + 3)

    def bullet(self, text, indent=4):
        if self.get_y() > self.h - 22:
            self.add_page()
        x = self.l_margin + indent
        self.set_x(x)
        self.set_font("Noto", "", 10)
        self.set_text_color(*TEAL)
        self.cell(4, 5.5, "•")
        self.set_text_color(*SLATE)
        self.multi_cell(self.w - self.r_margin - x - 4, 5.5, text)
        self.ln(0.3)

    def memo(self, text):
        self._info_box(f"Para memorizar: {text}", fill=(255, 251, 235), border=ORANGE)

    def numbered(self, n, text):
        if self.get_y() > self.h - 22:
            self.add_page()
        x = self.l_margin + 2
        self.set_x(x)
        self.set_font("Noto", "B", 10)
        self.set_text_color(*TEAL)
        self.cell(7, 5.5, f"{n}.")
        self.set_font("Noto", "", 10)
        self.set_text_color(*SLATE)
        self.multi_cell(self.w - self.r_margin - x - 7, 5.5, text)
        self.ln(0.3)


def build_question(pdf: GuidePDF, num, title, intro, question, answer, answer_label, explanation, memo=None):
    pdf.section_title(num, title)
    pdf.subsection("Introducción original")
    pdf.italic_body(f"«{intro}»")
    pdf.subsection("Pregunta probable")
    pdf.body(question)
    pdf.answer_box(answer_label, answer)
    pdf.subsection("Explicación")
    for part in explanation:
        kind, content = part
        if kind == "p":
            pdf.body(content)
        elif kind == "bullets":
            for b in content:
                pdf.bullet(b)
            pdf.ln(1)
        elif kind == "numbered":
            for i, b in enumerate(content, 1):
                pdf.numbered(i, b)
            pdf.ln(1)
        elif kind == "sub":
            pdf.subsection(content, color=ORANGE)
    if memo:
        pdf.memo(memo)


def main():
    pdf = GuidePDF()
    pdf.set_margins(16, 16, 16)
    pdf.cover()

    # Índice
    pdf.add_page()
    pdf.section_title(None, "Contenido")
    toc = [
        "1. Detección de actividad sospechosa",
        "2. Plan de recuperación ante desastres",
        "3. Interfaz de línea de comandos de Windows",
        "4. Relacionar escenarios con conceptos de seguridad",
        "5. Identificación y evaluación de vulnerabilidades",
        "6. Seguridad mediante un sistema señuelo",
        "7. Identificación de contraseñas seguras",
        "8. Seguridad durante el trabajo remoto",
        "9. Análisis mediante espacios aislados",
        "10. Ataques de ingeniería social",
        "11. Recopilación de información en Linux",
        "12. Envío accidental de información confidencial",
        "13. Prueba de penetración en una LAN",
        "14. Métricas para evaluar riesgos",
        "15. Protección de información hospitalaria",
        "16. Prevención de la suplantación de identidad en el correo",
        "17. Cifrado de disco y datos en reposo",
        "18. Empleado remoto que visita una sucursal",
        "19. Selección de software de seguridad",
        "20. Evaluación de seguridad de sistemas informáticos",
        "21. Cifrado de disco en macOS",
        "Resumen final · Repaso rápido · Recomendación",
    ]
    for i, item in enumerate(toc, 1):
        pdf.set_font("Noto", "", 10)
        pdf.set_text_color(*SLATE)
        # zebra
        if i % 2 == 1:
            y = pdf.get_y()
            pdf.set_fill_color(*LIGHT)
            pdf.rect(pdf.l_margin, y, pdf.w - pdf.l_margin - pdf.r_margin, 7, "F")
            pdf.set_xy(pdf.l_margin + 3, y + 1)
        else:
            pdf.set_x(pdf.l_margin + 3)
        pdf.cell(0, 7, item, new_x="LMARGIN", new_y="NEXT")

    # ── Preguntas ──
    questions = [
        dict(
            num=1,
            title="DETECCIÓN DE ACTIVIDAD SOSPECHOSA",
            intro="Su supervisor sospecha que alguien está intentando…",
            question=(
                "Su supervisor sospecha que alguien está intentando acceder sin "
                "autorización a los sistemas de la organización. ¿Qué herramienta "
                "podría ayudar a detectar esta actividad?"
            ),
            answer_label="Respuesta probable",
            answer="IDS (Intrusion Detection System).",
            explanation=[
                (
                    "p",
                    "Un IDS supervisa el tráfico de red o los eventos de un sistema "
                    "para identificar comportamientos sospechosos y generar alertas.",
                ),
                ("p", "Es importante distinguirlo de otras herramientas:"),
                (
                    "bullets",
                    [
                        "IDS: detecta intrusiones y genera alertas.",
                        "IPS: detecta y puede bloquear tráfico malicioso.",
                        "Firewall: permite o bloquea conexiones según reglas de seguridad.",
                        "SIEM: recopila y correlaciona registros de diferentes sistemas para detectar posibles incidentes.",
                    ],
                ),
            ],
            memo="IDS = detección; IPS = prevención o bloqueo.",
        ),
        dict(
            num=2,
            title="PLAN DE RECUPERACIÓN ANTE DESASTRES",
            intro="¿Cuál es la finalidad principal de un plan de recu…",
            question="¿Cuál es la finalidad principal de un plan de recuperación ante desastres (DRP)?",
            answer_label="Respuesta correcta",
            answer=(
                "Recuperar los sistemas informáticos, los datos y los servicios "
                "tecnológicos después de una interrupción o un desastre."
            ),
            explanation=[
                (
                    "p",
                    "Un DRP (Disaster Recovery Plan) establece procedimientos para "
                    "restaurar la infraestructura tecnológica después de un fallo grave, "
                    "un ciberataque o la pérdida de un centro de datos.",
                ),
                ("p", "No debe confundirse con un BCP:"),
                (
                    "bullets",
                    [
                        "DRP (Disaster Recovery Plan): recuperación de sistemas, datos y servicios tecnológicos.",
                        "BCP (Business Continuity Plan): continuidad de las funciones esenciales del negocio durante una interrupción.",
                    ],
                ),
                (
                    "p",
                    "Ejemplo: Si un ransomware afecta los servidores de una empresa, "
                    "el DRP establece cómo recuperar los sistemas y los datos.",
                ),
            ],
            memo="DRP = recuperación tecnológica; BCP = continuidad del negocio.",
        ),
        dict(
            num=3,
            title="INTERFAZ DE LÍNEA DE COMANDOS DE WINDOWS",
            intro="¿Qué aplicación de Windows es una interfaz de líne…",
            question="¿Qué aplicación de Windows proporciona una interfaz de línea de comandos?",
            answer_label="Respuesta posible",
            answer="Símbolo del sistema (Command Prompt o CMD).",
            explanation=[
                (
                    "p",
                    "Una interfaz de línea de comandos permite introducir instrucciones "
                    "de texto para interactuar con el sistema operativo.",
                ),
                ("p", "Debes reconocer las siguientes herramientas:"),
                (
                    "bullets",
                    [
                        "CMD: ejecuta comandos tradicionales de Windows.",
                        "PowerShell: permite ejecutar comandos y automatizar tareas administrativas.",
                        "Bash: shell habitual en Linux y otros sistemas Unix.",
                        "Terminal de Windows: aplicación que puede alojar CMD, PowerShell y otros shells.",
                    ],
                ),
                (
                    "p",
                    "Importante: CMD y PowerShell son respuestas posibles según el "
                    "enunciado completo. El fragmento disponible no permite determinar "
                    "cuál espera la pregunta.",
                ),
            ],
            memo=None,
        ),
        dict(
            num=4,
            title="RELACIONAR ESCENARIOS CON CONCEPTOS DE SEGURIDAD",
            intro="Mueva cada escenario desde la lista de la izquierd…",
            question="Relaciona cada escenario con el concepto de ciberseguridad correspondiente.",
            answer_label="Respuesta",
            answer="Depende de los escenarios y las opciones que aparezcan en pantalla.",
            explanation=[
                ("p", "Relaciones que debes estudiar:"),
                (
                    "bullets",
                    [
                        "Un usuario demuestra su identidad al iniciar sesión: autenticación.",
                        "Se determina qué archivos puede consultar ese usuario: autorización.",
                        "Un sistema detecta tráfico sospechoso: IDS.",
                        "Un sistema bloquea tráfico malicioso: IPS.",
                        "Se recuperan los sistemas después de un desastre: DRP.",
                        "Se mantienen las operaciones esenciales durante una interrupción: BCP.",
                        "Se ejecuta un archivo sospechoso en un entorno aislado: sandbox.",
                        "Se atrae a un atacante hacia un sistema señuelo: honeypot.",
                        "Se limita a los usuarios a los permisos estrictamente necesarios: principio de mínimo privilegio.",
                        "Se protege la comunicación mediante un túnel cifrado: VPN.",
                    ],
                ),
                (
                    "p",
                    "Este formato evalúa la capacidad de reconocer qué concepto "
                    "corresponde a una situación concreta. Identifica primero la "
                    "acción principal descrita en cada escenario.",
                ),
            ],
            memo=None,
        ),
        dict(
            num=5,
            title="IDENTIFICACIÓN Y EVALUACIÓN DE VULNERABILIDADES",
            intro="Observa que se ha compartido una nueva CVE con un…",
            question=(
                "Se ha publicado una nueva CVE para un producto utilizado por la "
                "organización. ¿Qué información debería consultar un analista para "
                "evaluar la gravedad de la vulnerabilidad?"
            ),
            answer_label="Respuesta probable",
            answer=(
                "La puntuación CVSS, junto con la información técnica de la "
                "vulnerabilidad y el contexto del sistema afectado."
            ),
            explanation=[
                (
                    "p",
                    "Una CVE identifica una vulnerabilidad conocida. CVSS permite "
                    "evaluar su gravedad mediante un sistema de puntuación.",
                ),
                (
                    "bullets",
                    [
                        "CVE (Common Vulnerabilities and Exposures): identificador de una vulnerabilidad conocida.",
                        "CVSS (Common Vulnerability Scoring System): sistema de puntuación de gravedad.",
                        "Parche: actualización que puede corregir una vulnerabilidad.",
                        "Mitigación: medida que reduce el riesgo.",
                    ],
                ),
                (
                    "p",
                    "Una puntuación alta no determina por sí sola toda la prioridad "
                    "de actuación. También importan la exposición del sistema, la "
                    "existencia de exploits y el impacto potencial.",
                ),
                (
                    "p",
                    "Ejemplo: Si un servidor expuesto a Internet presenta una "
                    "vulnerabilidad crítica, puede ser necesario priorizar su mitigación.",
                ),
            ],
            memo="CVE identifica; CVSS puntúa la gravedad.",
        ),
        dict(
            num=6,
            title="SEGURIDAD MEDIANTE UN SISTEMA SEÑUELO",
            intro="¿De qué forma mejora un señuelo la seguridad de re…",
            question="¿De qué forma mejora un honeypot la seguridad de una red?",
            answer_label="Respuesta correcta",
            answer="Atrae actividad potencialmente maliciosa para detectarla, observarla y analizarla.",
            explanation=[
                (
                    "p",
                    "Un honeypot es un sistema señuelo diseñado para parecer "
                    "interesante para un atacante.",
                ),
                (
                    "p",
                    "Puede utilizarse para detectar intentos de intrusión y recopilar "
                    "información sobre las técnicas utilizadas.",
                ),
                (
                    "p",
                    "Debe configurarse y supervisarse adecuadamente para evitar que "
                    "se convierta en una vía de acceso a otros sistemas.",
                ),
                ("p", "Diferencia importante:"),
                (
                    "bullets",
                    [
                        "Honeypot: atrae y observa actividad sospechosa.",
                        "Sandbox: permite ejecutar o analizar contenido en un entorno aislado.",
                    ],
                ),
            ],
            memo="honeypot = señuelo; sandbox = entorno aislado.",
        ),
        dict(
            num=7,
            title="IDENTIFICACIÓN DE CONTRASEÑAS SEGURAS",
            intro="¿Qué dos contraseñas siguen las directrices de la…",
            question="¿Qué dos contraseñas cumplen las directrices de seguridad establecidas?",
            answer_label="Respuesta",
            answer="No es posible identificar las dos contraseñas concretas sin ver las opciones.",
            explanation=[
                ("p", "Características que debes buscar:"),
                (
                    "numbered",
                    [
                        "Longitud suficiente.",
                        "Dificultad para ser adivinadas.",
                        "Ausencia de datos personales evidentes.",
                        "Ausencia de patrones extremadamente comunes.",
                        "Uso de contraseñas únicas para cada servicio.",
                    ],
                ),
                ("p", "Ejemplo de contraseña débil: Maria123"),
                (
                    "p",
                    "Una alternativa más segura es utilizar una frase de contraseña "
                    "larga, única y difícil de predecir, almacenada en un gestor de "
                    "contraseñas.",
                ),
                (
                    "p",
                    "La autenticación multifactor (MFA) añade una capa adicional de protección.",
                ),
                (
                    "p",
                    "Importante: si la pregunta presenta varias contraseñas, habrá que "
                    "evaluar las opciones concretas para identificar las dos respuestas correctas.",
                ),
            ],
            memo=None,
        ),
        dict(
            num=8,
            title="SEGURIDAD DURANTE EL TRABAJO REMOTO",
            intro="Está pensando trabajar desde casa. Su empresa le e…",
            question=(
                "Está pensando trabajar desde casa y su empresa le exige conectarse "
                "de forma segura a la red corporativa. ¿Qué solución podría utilizar?"
            ),
            answer_label="Respuesta probable",
            answer="Una VPN corporativa, si ese es el mecanismo establecido por la organización.",
            explanation=[
                (
                    "p",
                    "Una VPN puede establecer un túnel protegido entre el dispositivo "
                    "remoto y la infraestructura de la empresa.",
                ),
                ("p", "Otros controles importantes para el trabajo remoto incluyen:"),
                (
                    "bullets",
                    [
                        "Autenticación multifactor (MFA).",
                        "Actualizaciones de seguridad.",
                        "Protección del endpoint.",
                        "Redes Wi-Fi protegidas.",
                        "Control de acceso basado en los permisos del usuario.",
                    ],
                ),
                (
                    "p",
                    "Una VPN protege la comunicación, pero no garantiza por sí sola "
                    "que el dispositivo o la red sean seguros.",
                ),
            ],
            memo="VPN = conexión protegida a través de una red.",
        ),
        dict(
            num=9,
            title="ANÁLISIS MEDIANTE ESPACIOS AISLADOS",
            intro="¿De qué forma los espacios aislados ayudan a anali…",
            question="¿Cómo ayudan los espacios aislados o sandboxes a analizar archivos potencialmente maliciosos?",
            answer_label="Respuesta correcta",
            answer=(
                "Permiten ejecutar o analizar archivos en un entorno aislado para "
                "observar su comportamiento y reducir el riesgo para los sistemas principales."
            ),
            explanation=[
                (
                    "p",
                    "Un analista puede recibir un archivo adjunto sospechoso y "
                    "analizarlo en un entorno controlado en lugar de ejecutarlo "
                    "directamente en su computadora habitual.",
                ),
                ("p", "Durante el análisis, puede observar si el archivo intenta:"),
                (
                    "bullets",
                    [
                        "Crear procesos sospechosos.",
                        "Modificar archivos.",
                        "Establecer conexiones de red.",
                        "Descargar otros componentes maliciosos.",
                    ],
                ),
            ],
            memo="sandbox = entorno aislado para analizar archivos o programas.",
        ),
        dict(
            num=10,
            title="ATAQUES DE INGENIERÍA SOCIAL",
            intro="¿Cómo lanzan los agentes de amenazas ataques de so…",
            question="¿Cómo utilizan los agentes de amenazas la ingeniería social para comprometer sistemas?",
            answer_label="Respuesta correcta",
            answer=(
                "Manipulan a las personas para obtener información confidencial, "
                "credenciales o acciones que comprometan la seguridad."
            ),
            explanation=[
                (
                    "p",
                    "La ingeniería social explota la confianza, el miedo, la urgencia "
                    "o la curiosidad de las personas.",
                ),
                ("p", "Sus formas más comunes incluyen:"),
                (
                    "bullets",
                    [
                        "Phishing: engaños mediante correos electrónicos o sitios web fraudulentos.",
                        "Vishing: engaños mediante llamadas de voz.",
                        "Smishing: engaños mediante mensajes SMS.",
                        "Pretexting: creación de una historia falsa para obtener información.",
                    ],
                ),
                (
                    "p",
                    "Ejemplo: Un atacante se hace pasar por un técnico de soporte y "
                    "solicita la contraseña de un empleado.",
                ),
            ],
            memo="la ingeniería social manipula a las personas para comprometer la seguridad.",
        ),
        dict(
            num=11,
            title="RECOPILACIÓN DE INFORMACIÓN EN LINUX",
            intro="Está usando una estación de trabajo Linux para rec…",
            question=(
                "Está utilizando una estación de trabajo Linux para recopilar "
                "información del sistema o investigar un problema de seguridad. "
                "¿Qué comando debería utilizar?"
            ),
            answer_label="Respuesta",
            answer="Depende de la información que solicite el enunciado completo.",
            explanation=[
                ("p", "Comandos importantes:"),
                (
                    "bullets",
                    [
                        "pwd: muestra el directorio actual.",
                        "ls: lista archivos y directorios.",
                        "whoami: muestra el usuario actual.",
                        "ip addr: muestra información de las interfaces de red y sus direcciones IP.",
                        "ip route: muestra las rutas de red.",
                        "ps: muestra información sobre procesos.",
                        "ss -tuln: muestra sockets TCP/UDP en escucha, según las opciones utilizadas.",
                        "grep: busca patrones de texto.",
                        "sudo: permite ejecutar comandos con privilegios elevados cuando se dispone de autorización.",
                    ],
                ),
                (
                    "p",
                    "Los comandos de Linux permiten inspeccionar archivos, procesos, "
                    "usuarios y conexiones de red. Para seleccionar la respuesta "
                    "correcta, identifica qué información necesita obtener el usuario.",
                ),
            ],
            memo="aprende qué hace cada comando, no solo su nombre.",
        ),
        dict(
            num=12,
            title="ENVÍO ACCIDENTAL DE INFORMACIÓN CONFIDENCIAL",
            intro="Un empleado envía por error un correo electrónico…",
            question=(
                "Un empleado envía accidentalmente información confidencial a un "
                "destinatario no autorizado. ¿Qué debería hacer?"
            ),
            answer_label="Respuesta probable",
            answer=(
                "Informar inmediatamente del incidente al equipo responsable y "
                "seguir el procedimiento de respuesta a incidentes de la organización."
            ),
            explanation=[
                (
                    "p",
                    "El envío accidental de información puede constituir un incidente "
                    "de seguridad o privacidad.",
                ),
                ("p", "Las medidas pueden incluir:"),
                (
                    "numbered",
                    [
                        "Notificar el incidente.",
                        "Identificar qué información se envió y a quién.",
                        "Intentar retirar el mensaje si el sistema lo permite.",
                        "Solicitar al destinatario que no utilice ni comparta la información, según las instrucciones del equipo responsable.",
                        "Evaluar el impacto y cumplir los procedimientos aplicables.",
                    ],
                ),
                (
                    "p",
                    "Eliminar el correo de la carpeta de enviados no garantiza que "
                    "se elimine la copia del destinatario.",
                ),
            ],
            memo="notificación rápida y gestión adecuada del incidente.",
        ),
        dict(
            num=13,
            title="PRUEBA DE PENETRACIÓN EN UNA LAN",
            intro="Va a realizar una prueba de penetración en la LAN …",
            question="Va a realizar una prueba de penetración en una red de área local. ¿Qué debe hacer antes de comenzar?",
            answer_label="Respuesta probable",
            answer="Obtener autorización explícita y definir el alcance, los objetivos y las reglas de la prueba.",
            explanation=[
                (
                    "p",
                    "Una prueba de penetración busca identificar vulnerabilidades "
                    "mediante técnicas controladas de evaluación de seguridad.",
                ),
                ("p", "Antes de comenzar, se deben definir:"),
                (
                    "bullets",
                    [
                        "Sistemas y direcciones IP autorizados.",
                        "Técnicas permitidas.",
                        "Horarios de ejecución.",
                        "Riesgos y posibles interrupciones.",
                        "Procedimientos de comunicación y reporte.",
                    ],
                ),
                (
                    "p",
                    "Las herramientas de evaluación deben utilizarse dentro del alcance autorizado.",
                ),
            ],
            memo="una prueba de penetración debe estar autorizada y tener un alcance definido.",
        ),
        dict(
            num=14,
            title="MÉTRICAS PARA EVALUAR RIESGOS",
            intro="¿Qué dos métricas básicas se deben considerar al a…",
            question="¿Qué dos métricas básicas deben considerarse al analizar un riesgo de seguridad?",
            answer_label="Respuesta probable",
            answer="La probabilidad de que ocurra un evento y el impacto que tendría.",
            explanation=[
                (
                    "p",
                    "Una evaluación de riesgos considera qué tan probable es que "
                    "ocurra un incidente y cuáles serían sus consecuencias.",
                ),
                (
                    "p",
                    "Por ejemplo, una vulnerabilidad expuesta a Internet que afecta "
                    "a un servicio crítico podría recibir una prioridad alta.",
                ),
                (
                    "p",
                    "Sin embargo, el fragmento podría referirse a otras métricas "
                    "específicas. Debes distinguir:",
                ),
                (
                    "bullets",
                    [
                        "Probabilidad e impacto: evaluación general del riesgo.",
                        "RTO y RPO: objetivos de recuperación ante interrupciones.",
                        "CVSS: puntuación de gravedad de una vulnerabilidad.",
                    ],
                ),
            ],
            memo="riesgo = probabilidad e impacto, en una evaluación general.",
        ),
        dict(
            num=15,
            title="PROTECCIÓN DE INFORMACIÓN HOSPITALARIA",
            intro="Trabaja para un hospital que almacena la información…",
            question=(
                "Trabaja para un hospital que almacena información sensible de sus "
                "pacientes. ¿Qué medidas deberían proteger esos datos?"
            ),
            answer_label="Respuesta probable",
            answer=(
                "Controles de acceso, cifrado y medidas para garantizar la "
                "confidencialidad, integridad y disponibilidad de la información."
            ),
            explanation=[
                (
                    "p",
                    "Los registros médicos contienen información sensible y deben "
                    "protegerse frente a accesos no autorizados, modificaciones "
                    "indebidas y pérdida de disponibilidad.",
                ),
                ("p", "Entre los controles relevantes se encuentran:"),
                (
                    "bullets",
                    [
                        "Cifrado de datos.",
                        "Autenticación multifactor.",
                        "Permisos basados en funciones.",
                        "Registros de auditoría.",
                        "Copias de seguridad protegidas.",
                    ],
                ),
                ("p", "La tríada CIA:"),
                (
                    "bullets",
                    [
                        "Confidencialidad: solo las personas autorizadas pueden acceder a los datos.",
                        "Integridad: los datos no deben modificarse indebidamente.",
                        "Disponibilidad: los datos y servicios deben estar accesibles cuando se necesitan.",
                    ],
                ),
            ],
            memo="CIA = confidencialidad, integridad y disponibilidad.",
        ),
        dict(
            num=16,
            title="PREVENCIÓN DE LA SUPLANTACIÓN DE IDENTIDAD EN EL CORREO",
            intro="¿Qué debe crear para evitar la suplantación de ide…",
            question=(
                "¿Qué registro o mecanismo de seguridad debería configurar una "
                "organización para reducir la suplantación de identidad de su "
                "dominio de correo electrónico?"
            ),
            answer_label="Respuesta probable",
            answer="SPF, DKIM o DMARC, dependiendo del enunciado completo.",
            explanation=[
                ("p", "Estos mecanismos ayudan a proteger los dominios de correo electrónico:"),
                (
                    "bullets",
                    [
                        "SPF (Sender Policy Framework): especifica qué servidores están autorizados para enviar correo en nombre de un dominio.",
                        "DKIM (DomainKeys Identified Mail): utiliza una firma criptográfica que ayuda a verificar la autenticidad e integridad del mensaje.",
                        "DMARC (Domain-based Message Authentication, Reporting and Conformance): permite establecer una política para gestionar mensajes que no superan determinadas comprobaciones de autenticación y recibir informes.",
                    ],
                ),
                ("p", "Cómo distinguirlos:"),
                (
                    "bullets",
                    [
                        "Si pregunta qué servidores están autorizados a enviar correo: SPF.",
                        "Si pregunta por una firma criptográfica del mensaje: DKIM.",
                        "Si pregunta por una política para gestionar mensajes que no superan las comprobaciones SPF/DKIM: DMARC.",
                    ],
                ),
            ],
            memo="SPF = servidores autorizados; DKIM = firma; DMARC = política e informes.",
        ),
        dict(
            num=17,
            title="CIFRADO DE DISCO Y DATOS EN REPOSO",
            intro="¿Qué tipo de datos se protege con el cifrado del d…",
            question="¿Qué tipo de datos protege el cifrado de disco?",
            answer_label="Respuesta correcta",
            answer="Los datos en reposo.",
            explanation=[
                ("p", "El cifrado de disco protege la información almacenada en un dispositivo."),
                (
                    "p",
                    "Si una computadora portátil se pierde o es robada, el cifrado "
                    "de disco puede dificultar que una persona no autorizada acceda "
                    "a los datos almacenados.",
                ),
                ("p", "Debes distinguir:"),
                (
                    "bullets",
                    [
                        "Datos en reposo: archivos, bases de datos y otros datos almacenados.",
                        "Datos en tránsito: información transmitida por una red.",
                    ],
                ),
            ],
            memo="cifrado de disco = protección de datos en reposo.",
        ),
        dict(
            num=18,
            title="EMPLEADO REMOTO QUE VISITA UNA SUCURSAL",
            intro="Un empleado remoto visita una sucursal para asisti…",
            question=(
                "Un empleado remoto visita una sucursal para asistir a una reunión "
                "o trabajar temporalmente. ¿Qué mecanismo permitiría conectarse de "
                "forma segura a los recursos corporativos?"
            ),
            answer_label="Respuesta",
            answer="Depende de la necesidad específica descrita en el enunciado.",
            explanation=[
                ("p", "Posibilidades que debes estudiar:"),
                (
                    "bullets",
                    [
                        "VPN: si necesita establecer una conexión protegida a la red corporativa.",
                        "MFA: si debe verificar su identidad mediante dos o más factores de categorías distintas.",
                        "Wi-Fi empresarial seguro: si necesita conectarse a una red inalámbrica corporativa.",
                        "Control de acceso: si el problema se refiere a los recursos a los que puede acceder.",
                    ],
                ),
                (
                    "p",
                    "La solución correcta depende del problema que se intenta resolver. "
                    "No basta con saber que el empleado es remoto: hay que identificar "
                    "si la pregunta trata sobre conexión, autenticación o autorización.",
                ),
            ],
            memo=None,
        ),
        dict(
            num=19,
            title="SELECCIÓN DE SOFTWARE DE SEGURIDAD",
            intro="Necesita una solución de software que realice las …",
            question=(
                "Necesita una solución de software que realice automáticamente "
                "determinadas tareas de seguridad. ¿Qué herramienta debería seleccionar?"
            ),
            answer_label="Respuesta",
            answer="No se puede determinar una herramienta concreta sin el resto del enunciado.",
            explanation=[
                ("p", "Herramientas que debes reconocer:"),
                (
                    "bullets",
                    [
                        "Antivirus o EDR: detección y respuesta ante amenazas en endpoints.",
                        "SIEM: centralización y correlación de registros.",
                        "IDS: detección de actividad sospechosa.",
                        "IPS: detección y posible bloqueo de tráfico malicioso.",
                        "Sandbox: análisis de archivos en un entorno aislado.",
                        "Escáner de vulnerabilidades: identificación de posibles vulnerabilidades.",
                        "Firewall: filtrado del tráfico de red.",
                    ],
                ),
                (
                    "p",
                    "Cada solución tiene una función principal. Para responder "
                    "correctamente, identifica qué tarea necesita realizar la organización.",
                ),
            ],
            memo="asocia cada herramienta con su propósito.",
        ),
        dict(
            num=20,
            title="EVALUACIÓN DE SEGURIDAD DE SISTEMAS INFORMÁTICOS",
            intro="¿Qué evaluación de seguridad de sistemas informáti…",
            question="¿Qué evaluación de seguridad permite identificar vulnerabilidades y comprobar si pueden explotarse?",
            answer_label="Respuesta probable",
            answer=(
                "Una prueba de penetración, si el enunciado indica que se intentan "
                "explotar vulnerabilidades de forma controlada."
            ),
            explanation=[
                ("p", "Existen distintos tipos de evaluación de seguridad:"),
                (
                    "bullets",
                    [
                        "Evaluación de vulnerabilidades: identifica y analiza posibles debilidades.",
                        "Prueba de penetración: intenta explotar vulnerabilidades de manera autorizada y controlada.",
                        "Auditoría de seguridad: examina controles, políticas y cumplimiento.",
                        "Análisis de riesgos: evalúa la probabilidad y el impacto de posibles incidentes.",
                    ],
                ),
                (
                    "p",
                    "Diferencia fundamental: identificar una vulnerabilidad no es lo "
                    "mismo que intentar explotarla para demostrar su impacto.",
                ),
            ],
            memo=None,
        ),
        dict(
            num=21,
            title="CIFRADO DE DISCO EN macOS",
            intro="¿Qué característica de seguridad de macOS cifra to…",
            question="¿Qué característica de seguridad de macOS cifra el disco para proteger los datos almacenados?",
            answer_label="Respuesta correcta",
            answer="FileVault.",
            explanation=[
                (
                    "p",
                    "FileVault es la función de cifrado de disco de macOS que protege "
                    "los datos almacenados en el dispositivo.",
                ),
                (
                    "p",
                    "El cifrado dificulta que una persona no autorizada acceda a la "
                    "información si obtiene acceso físico al equipo.",
                ),
                ("p", "Comparación entre sistemas operativos:"),
                (
                    "bullets",
                    [
                        "macOS: FileVault.",
                        "Windows: BitLocker.",
                        "Linux: LUKS, entre otras opciones.",
                    ],
                ),
            ],
            memo="FileVault = macOS; BitLocker = Windows.",
        ),
    ]

    for q in questions:
        build_question(pdf, **q)

    # Resumen final
    pdf.add_page()
    pdf.section_title(None, "RESUMEN FINAL: CONCEPTOS QUE DEBES MEMORIZAR")

    summaries = [
        (
            "1. Herramientas de seguridad",
            [
                "IDS: detecta y alerta.",
                "IPS: detecta y puede bloquear.",
                "SIEM: centraliza y correlaciona registros.",
                "Firewall: filtra conexiones de red.",
                "Honeypot: atrae y permite observar actividad sospechosa.",
                "Sandbox: analiza contenido en un entorno aislado.",
                "Antivirus: detecta y bloquea malware.",
                "EDR: permite detectar, investigar y responder a amenazas en endpoints.",
                "Escáner de vulnerabilidades: identifica posibles debilidades de seguridad.",
            ],
        ),
        (
            "2. Gestión de vulnerabilidades",
            [
                "CVE: identifica una vulnerabilidad conocida.",
                "CVSS: puntúa su gravedad.",
                "Parche: actualización que corrige una vulnerabilidad u otro problema.",
                "Mitigación: medida para reducir el riesgo.",
                "Vulnerabilidad: debilidad que puede aprovecharse.",
                "Amenaza: actor, situación o evento capaz de causar daño.",
                "Riesgo: posibilidad e impacto de que una amenaza aproveche una vulnerabilidad.",
            ],
        ),
        (
            "3. Continuidad y recuperación",
            [
                "BCP: mantiene las operaciones esenciales del negocio.",
                "DRP: recupera sistemas, datos y servicios tecnológicos.",
                "RTO: objetivo de tiempo de recuperación.",
                "RPO: objetivo de punto de recuperación; se relaciona con la pérdida de datos tolerable medida en tiempo.",
            ],
        ),
        (
            "4. Identidad y acceso",
            [
                "Autenticación: verifica quién eres.",
                "Autorización: determina qué puedes hacer.",
                "MFA: utiliza dos o más factores de categorías distintas.",
                "Mínimo privilegio: concede solo los permisos necesarios.",
                "VPN: establece una conexión protegida a través de una red.",
            ],
        ),
        (
            "5. Seguridad del correo electrónico",
            [
                "SPF: identifica los servidores autorizados para enviar correo por un dominio.",
                "DKIM: utiliza firmas criptográficas para verificar mensajes.",
                "DMARC: establece políticas e informes relacionados con la autenticación del correo.",
            ],
        ),
        (
            "6. Protección de datos",
            [
                "Datos en reposo: datos almacenados.",
                "Datos en tránsito: datos transmitidos por una red.",
                "Cifrado: transforma información para que no pueda leerse sin la clave adecuada.",
                "Confidencialidad: evita la divulgación no autorizada.",
                "Integridad: protege frente a modificaciones indebidas.",
                "Disponibilidad: permite acceder a datos y servicios cuando se necesitan.",
            ],
        ),
        (
            "7. Sistemas operativos",
            [
                "CMD: línea de comandos tradicional de Windows.",
                "PowerShell: comandos y automatización en Windows.",
                "Bash: shell habitual en Linux.",
                "FileVault: cifrado de disco en macOS.",
                "BitLocker: cifrado de disco en Windows.",
                "LUKS: tecnología de cifrado de dispositivos de almacenamiento utilizada en Linux.",
            ],
        ),
        (
            "8. Amenazas y evaluaciones",
            [
                "Phishing: engaño mediante mensajes o sitios fraudulentos.",
                "Vishing: engaño mediante llamadas de voz.",
                "Smishing: engaño mediante SMS.",
                "Ingeniería social: manipulación de personas para comprometer la seguridad.",
                "Evaluación de vulnerabilidades: identifica debilidades.",
                "Prueba de penetración: intenta explotar vulnerabilidades de forma autorizada.",
                "Respuesta a incidentes: proceso de detección, contención, erradicación, recuperación y mejora.",
            ],
        ),
    ]

    for title, items in summaries:
        pdf.subsection(title)
        for item in items:
            pdf.bullet(item)
        pdf.ln(2)

    # Autoevaluación
    pdf.add_page()
    pdf.section_title(None, "REPASO RÁPIDO: 10 PREGUNTAS DE AUTOEVALUACIÓN")

    quiz = [
        ("¿Qué herramienta detecta intrusiones y genera alertas?", "IDS."),
        ("¿Qué herramienta puede bloquear automáticamente tráfico malicioso?", "IPS."),
        ("¿Qué sistema puntúa la gravedad de una vulnerabilidad?", "CVSS."),
        ("¿Qué plan busca mantener las operaciones esenciales del negocio?", "BCP."),
        ("¿Qué plan se centra en recuperar los sistemas tecnológicos después de un desastre?", "DRP."),
        ("¿Qué mecanismo atrae a posibles atacantes para observar su actividad?", "Honeypot."),
        ("¿Qué entorno permite analizar un archivo potencialmente malicioso de forma aislada?", "Sandbox."),
        ("¿Qué tipo de datos protege el cifrado de disco?", "Datos en reposo."),
        ("¿Qué función de macOS cifra el disco?", "FileVault."),
        (
            "¿Qué mecanismo ayuda a establecer una política contra la suplantación "
            "del dominio de correo y generar informes?",
            "DMARC.",
        ),
    ]

    for i, (q, a) in enumerate(quiz, 1):
        pdf.subsection(f"Pregunta {i}")
        pdf.body(q)
        pdf.answer_box("Respuesta", a)
        pdf.ln(1)

    # Recomendación final
    pdf.add_page()
    pdf.section_title(None, "RECOMENDACIÓN FINAL")
    pdf.body(
        "Para preparar el examen CCST Cybersecurity, estudia primero las diferencias "
        "entre herramientas y conceptos que pueden parecer similares: IDS e IPS, "
        "CVE y CVSS, BCP y DRP, honeypot y sandbox, autenticación y autorización, "
        "y datos en reposo y en tránsito."
    )
    pdf.body(
        "Después, practica escenarios en los que tengas que seleccionar una "
        "herramienta o una medida de seguridad según el problema descrito."
    )
    pdf._info_box(
        "Importante: esta guía es material de práctica elaborado a partir de las "
        "introducciones proporcionadas. No es un banco oficial de preguntas de Cisco. "
        "Para conocer la respuesta exacta a cada pregunta reconstruida, sería "
        "necesario ver el enunciado completo y, preferiblemente, sus opciones."
    )

    # Tabla rápida de pares clave
    pdf.ln(4)
    pdf.subsection("Pares clave para el examen")
    pairs = [
        ("IDS", "Detecta y alerta"),
        ("IPS", "Detecta y puede bloquear"),
        ("CVE", "Identifica vulnerabilidad"),
        ("CVSS", "Puntúa gravedad"),
        ("BCP", "Continuidad del negocio"),
        ("DRP", "Recuperación tecnológica"),
        ("Honeypot", "Sistema señuelo"),
        ("Sandbox", "Entorno aislado"),
        ("FileVault", "Cifrado macOS"),
        ("BitLocker", "Cifrado Windows"),
        ("SPF / DKIM / DMARC", "Protección del correo"),
        ("CIA", "Confidencialidad, integridad, disponibilidad"),
    ]
    col1 = 55
    col2 = pdf.w - pdf.l_margin - pdf.r_margin - col1
    # header
    y = pdf.get_y()
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("Noto", "B", 9)
    pdf.cell(col1, 8, " Concepto", fill=True, border=0)
    pdf.cell(col2, 8, " Idea clave", fill=True, border=0, new_x="LMARGIN", new_y="NEXT")
    for idx, (a, b) in enumerate(pairs):
        if idx % 2 == 0:
            pdf.set_fill_color(*LIGHT)
        else:
            pdf.set_fill_color(*WHITE)
        pdf.set_font("Noto", "B", 9)
        pdf.set_text_color(*TEAL)
        pdf.cell(col1, 7, f" {a}", fill=True)
        pdf.set_font("Noto", "", 9)
        pdf.set_text_color(*SLATE)
        pdf.cell(col2, 7, f" {b}", fill=True, new_x="LMARGIN", new_y="NEXT")

    pdf.output(str(OUT))
    print(f"PDF generado: {OUT}")
    print(f"Tamaño: {OUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
