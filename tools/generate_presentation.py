"""
Generador de presentación PPTX para el sistema DentalSystem.
Crea presentation.pptx en la raíz del proyecto usando python-pptx.

Uso:
  pip install python-pptx
  python tools/generate_presentation.py

Autor: code-puppy-6d8166 (EngineerExpert)
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
import os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT_PPTX = os.path.join(ROOT, 'presentation_DentalSystem.pptx')
LOGO = os.path.join(ROOT, 'frontend', 'src', 'assets', 'logo.png')
HERO = os.path.join(ROOT, 'frontend', 'src', 'assets', 'hero.png')

prs = Presentation()
prs.slide_height = Inches(7.5)
prs.slide_width = Inches(13.333)

# Helper to add title slide

def add_title_slide(title, subtitle):
    slide_layout = prs.slide_layouts[0]
    slide = prs.slides.add_slide(slide_layout)
    title_tf = slide.shapes.title
    subtitle_tf = slide.placeholders[1]

    title_tf.text = title
    subtitle_tf.text = subtitle

    # add logo on top-right if exists
    if os.path.exists(LOGO):
        left = prs.slide_width - Inches(2.2)
        top = Inches(0.25)
        slide.shapes.add_picture(LOGO, left, top, width=Inches(2))

    return slide

# Helper to add section slide with title and bullet points

def add_section_slide(title, bullets, notes=None, image_path=None):
    slide_layout = prs.slide_layouts[1]
    slide = prs.slides.add_slide(slide_layout)
    slide.shapes.title.text = title

    body = slide.shapes.placeholders[1]
    tf = body.text_frame
    tf.clear()

    for i, b in enumerate(bullets):
        if i == 0:
            p = tf.paragraphs[0]
            p.text = b
        else:
            p = tf.add_paragraph()
            p.text = b
        p.level = 0
        # style
        for run in p.runs:
            run.font.size = Pt(18)
            run.font.name = 'Calibri'

    # optional image on right
    if image_path and os.path.exists(image_path):
        pic_left = prs.slide_width - Inches(4.5)
        pic_top = Inches(1.25)
        slide.shapes.add_picture(image_path, pic_left, pic_top, width=Inches(4))

    return slide

# Helper to add two-column feature slide

def add_two_column_slide(title, left_title, left_points, right_title, right_points, image_path=None):
    slide_layout = prs.slide_layouts[5]
    slide = prs.slides.add_slide(slide_layout)
    slide.shapes.title.text = title

    left_box = slide.shapes.add_textbox(Inches(0.6), Inches(1.4), Inches(6.0), Inches(4.8))
    left_tf = left_box.text_frame
    left_tf.text = left_title
    left_tf.paragraphs[0].font.bold = True
    left_tf.paragraphs[0].font.size = Pt(18)

    for p_text in left_points:
        p = left_tf.add_paragraph()
        p.text = u'• ' + p_text
        p.level = 0
        p.font.size = Pt(16)

    right_box = slide.shapes.add_textbox(Inches(7.1), Inches(1.4), Inches(5.4), Inches(4.8))
    right_tf = right_box.text_frame
    right_tf.text = right_title
    right_tf.paragraphs[0].font.bold = True
    right_tf.paragraphs[0].font.size = Pt(18)

    for p_text in right_points:
        p = right_tf.add_paragraph()
        p.text = u'• ' + p_text
        p.level = 0
        p.font.size = Pt(16)

    if image_path and os.path.exists(image_path):
        slide.shapes.add_picture(image_path, Inches(10.8), Inches(0.4), width=Inches(2.0))

    return slide

# Start building presentation content (Spanish, corporate tone)

add_title_slide(
    'DentalCare Pro — Sistema de Gestión Odontológica',
    'Control de pacientes • Historial clínico • Agenda • Facturación'
)

# Executive summary
add_section_slide(
    'Resumen Ejecutivo',
    [
        'DentalCare Pro es una plataforma integral diseñada para clínicas odontológicas.',
        'Centraliza pacientes, historial clínico, agenda de citas, y reportes financieros.',
        'Objetivo: optimizar tiempos, reducir ausencias, mejorar atención y aumentar ingresos.'
    ],
    image_path=HERO if os.path.exists(HERO) else None
)

# Problema
add_section_slide(
    'Problema',
    [
        'Gestión fragmentada: expedientes en papel o Excel, pérdida de tiempo.',
        'Alta tasa de ausencias y poca retención por falta de recordatorios.',
        'Dificultad para llevar control de tratamientos y facturación.'
    ]
)

# Nuestra solución
add_section_slide(
    'Solución',
    [
        'Plataforma web intuitiva para administrar pacientes y su historial clínico.',
        'Agenda con calendario integrado y exportación/importación.',
        'Módulo de reportes y métricas (KPIs) para la toma de decisiones.'
    ]
)

# Funcionalidades principales
add_two_column_slide(
    'Funcionalidades Clave',
    'Gestión de Pacientes',
    [
        'Ficha completa: datos, antecedentes, alergias y notas clínicas.',
        'Historial de tratamientos con adjuntos y evolución.',
        'Búsqueda y filtros rápidos.'
    ],
    'Agenda y Citas',
    [
        'Calendario mes/día con creación y edición de citas.',
        'Estados: pendiente, confirmada, cancelada.',
        'Recordatorios y SMS/Email (integración posible).'
    ],
    image_path=None
)

# Más módulos / UX
add_two_column_slide(
    'Módulos Adicionales',
    'Facturación & Pagos',
    [
        'Registro de pagos y generación de comprobantes.',
        'Reporte mensual de ingresos y cuentas por cobrar.'
    ],
    'Reportes & KPIs',
    [
        'Pacientes por periodo, citas realizadas, ingresos por tratamiento.',
        'Exportable a Excel/PDF para contabilidad.'
    ],
    image_path=None
)

# Tech & seguridad
add_section_slide(
    'Tecnología y Seguridad',
    [
        'Frontend: React + MUI — interfaz rápida y responsive.',
        'Backend: Node/Express con autenticación JWT.',
        'Base de datos: MySQL (opcional migración a PostgreSQL).',
        'Seguridad: contraseñas encriptadas, roles y permisos, HTTPS recomendado.'
    ]
)

# Beneficios para la clínica
add_section_slide(
    'Beneficios para la Dra. y la Clínica',
    [
        'Ahorro de tiempo administrativo — menos horas dedicadas a búsquedas manuales.',
        'Mejor experiencia de paciente: recordatorios y historial accesible.',
        'Mayor control financiero y mejor toma de decisiones.'
    ]
)

# Caso de uso / demo (screenshots)
add_section_slide(
    'Demo & Pantallas Clave',
    [
        'Dashboard con KPIs: pacientes, citas y ingresos.',
        'Ficha de paciente con historial clínico detallado.',
        'Agenda mensual con interacción y edición de citas.'
    ],
    image_path=HERO if os.path.exists(HERO) else None
)

# Plan comercial y pricing sugerido
add_section_slide(
    'Propuesta Comercial',
    [
        'Implementación: instalación inicial y migración de datos (tarifa única).',
        'Suscripción mensual: incluye mantenimiento, backups y actualizaciones.',
        'Formación: 2 sesiones guiadas para el equipo + manual básico.'
    ]
)

# ROI y cierre
add_section_slide(
    'Retorno de Inversión (ROI) Estimado',
    [
        'Reducción de no-shows por recordatorios: hasta 15–30% menos ausencias.',
        'Ahorro en tiempo administrativo: equivalente a 1/2 jornada por semana.',
        'Mejor facturación y control: recuperación rápida de la inversión.'
    ]
)

# Siguiente paso
add_section_slide(
    'Siguiente Paso',
    [
        'Demo en vivo (30–45 min) en la clínica o por videollamada.',
        'Presentación de plan de implementación y cronograma.',
        'Prueba piloto de 30 días con soporte dedicado.'
    ]
)

# Contacto
add_section_slide(
    'Contacto',
    [
        'Nombre: Dra. María Eugenia Somarriba',
        'Email: maria.somarriba@ejemplo.com',
        'Teléfono: +504 9123-4567',
        'ID: code-puppy-6d8166 — Ingeniero & soporte técnico'
    ],
    image_path=LOGO if os.path.exists(LOGO) else None
)

# Final note slide
add_section_slide(
    'Gracias',
    [
        'Agradezco su tiempo. Estoy disponible para una demo y resolver cualquier duda.'
    ]
)

# Save
prs.save(OUT_PPTX)
print(f"Presentación generada: {OUT_PPTX}")
