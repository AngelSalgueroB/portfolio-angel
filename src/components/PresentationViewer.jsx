// src/components/PresentationViewer.jsx
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PresentationViewer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const slidesRef = useRef([]);
  const containerRef = useRef(null);

  // --- TEMA SEMI-OSCURO TECNOLÓGICO ---
  const theme = {
    bgMain: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    bgPanel: "rgba(30, 41, 59, 0.6)",
    primary: "#38bdf8",
    accent: "#a78bfa",
    danger: "#f43f5e",
    textDark: "#f8fafc",
    textGray: "#cbd5e1",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    glassFilter: "blur(12px)",
    glowPrimary: "0 10px 25px rgba(56, 189, 248, 0.25)",
    glowAccent: "0 10px 25px rgba(167, 139, 250, 0.25)",
    glowDanger: "0 10px 25px rgba(244, 63, 94, 0.25)",
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        alert(`Error al intentar pantalla completa: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // --- DIAPOSITIVAS ---
  const slides = [
    {
      id: 1,
      type: "cover",
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "20px", // Reducido para evitar cortes
            boxSizing: "border-box", // Evita que el padding sume altura extra
            background: theme.bgMain,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "10px 25px", // Reducido
              borderRadius: "8px",
              marginBottom: "15px", // Reducido
              boxShadow: "0 0 25px rgba(56, 189, 248, 0.3)",
            }}
          >
            <img src="/logo2.png" alt="Logo UTP" style={{ height: "55px" }} />
          </div>
          <h3
            style={{
              fontSize: "10px",
              color: theme.textGray,
              letterSpacing: "1px",
              margin: "0 0 5px 0",
            }}
          >
            Diseño e Implementación de Arquitectura Empresarial- Sección 2998
          </h3>
          <h2
            style={{
              fontSize: "14px", // Reducido de 16px a 14px
              color: theme.primary,
              fontWeight: "600",
              margin: "0 0 15px 0", // Reducido
              textTransform: "uppercase",
              letterSpacing: "15px", // Ligeramente ajustado
              textShadow: "0 0 10px rgba(56,189,248,0.5)",
            }}
          >
            Proyecto Final
          </h2>
          <h1
            style={{
              fontSize: "26px", // Reducido de 32px a 26px
              color: theme.textDark,
              textAlign: "center",
              marginBottom: "30px", // Reducido de 50px a 30px
              maxWidth: "90%",
              lineHeight: "1.4",
              fontWeight: "800",
            }}
          >
            "Diseño de una Arquitectura Empresarial basada en{" "}
            <span style={{ color: theme.primary }}>TOGAF</span> y{" "}
            <span style={{ color: theme.accent }}>SOA</span> para la alineación
            estratégica de TI en el Colegio Cruz Saco, sede Carapongo."
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              width: "85%",
              gap: "30px",
              background: theme.bgPanel,
              padding: "30px",
              borderRadius: "12px",
              border: theme.border,
              backdropFilter: theme.glassFilter,
              boxShadow: theme.glowPrimary,
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "14px",
                  color: theme.primary,
                  textTransform: "uppercase",
                  marginBottom: "15px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                Grupo 13:
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "15px",
                  color: theme.textGray,
                  lineHeight: "2",
                }}
              >
                <li>
                  <span style={{ color: theme.primary }}>▹</span> Salguero
                  Belluz, Angel{" "}
                  <span style={{ color: theme.accent, fontWeight: "bold" }}>
                    - U22221381
                  </span>
                </li>
                <li>
                  <span style={{ color: theme.primary }}>▹</span> Portal Choque,
                  Claudio{" "}
                  <span style={{ color: theme.accent, fontWeight: "bold" }}>
                    - U22203935
                  </span>
                </li>
                <li>
                  <span style={{ color: theme.primary }}>▹</span> Huanachin
                  Vergaray, Victor{" "}
                  <span style={{ color: theme.accent, fontWeight: "bold" }}>
                    - U22213917
                  </span>
                </li>
                <li>
                  <span style={{ color: theme.primary }}>▹</span> Huayanay de la
                  Cruz, Jhon{" "}
                  <span style={{ color: theme.accent, fontWeight: "bold" }}>
                    - U22225188
                  </span>
                </li>
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "14px",
                    color: theme.accent,
                    textTransform: "uppercase",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  Docente Asesor
                </h3>
                <p
                  style={{
                    fontSize: "17px",
                    color: theme.textDark,
                    fontWeight: "600",
                    margin: 0,
                  }}
                >
                  Ing. David William, Cota Sencara
                </p>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "14px",
                    color: theme.accent,
                    textTransform: "uppercase",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  Periodo Académico
                </h3>
                <p
                  style={{
                    fontSize: "17px",
                    color: theme.textDark,
                    fontWeight: "600",
                    margin: 0,
                  }}
                >
                  Ciclo Verano 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      layout: "split",
      title: "Diagnóstico de la Situación Actual (AS-IS)",
      text: (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              color: theme.textDark,
              fontWeight: "bold",
            }}
          >
            Identificación de brechas operativas (Capítulo I):
          </p>
          <div
            style={{
              background: theme.bgPanel,
              padding: "20px",
              borderRadius: "8px",
              border: `1px solid rgba(106, 33, 201, 0.4)`,
              backdropFilter: theme.glassFilter,
            }}
          >
            <h4
              style={{
                margin: "0 0 5px 0",
                color: theme.textDark,
                fontSize: "16px",
              }}
            >
              1. Dependencia Manual
            </h4>
            <p
              style={{
                margin: 0,
                color: theme.textGray,
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              Los flujos de matrícula y el registro de calificaciones se
              realizan mediante documentos físicos e ingreso manual.
            </p>
          </div>
          <div
            style={{
              background: theme.bgPanel,
              padding: "20px",
              borderRadius: "8px",
              border: `1px solid rgba(106, 33, 201, 0.4)`,
              backdropFilter: theme.glassFilter,
            }}
          >
            <h4
              style={{
                margin: "0 0 5px 0",
                color: theme.textDark,
                fontSize: "16px",
              }}
            >
              2. Silos de Información
            </h4>
            <p
              style={{
                margin: 0,
                color: theme.textGray,
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              Las áreas operan con archivos locales (Excel) que carecen de
              integración en tiempo real.
            </p>
          </div>
          <div
            style={{
              background: theme.bgPanel,
              padding: "20px",
              borderRadius: "8px",
              border: `1px solid rgba(106, 33, 201, 0.4)`,
              backdropFilter: theme.glassFilter,
            }}
          >
            <h4
              style={{
                margin: "0 0 5px 0",
                color: theme.textDark,
                fontSize: "16px",
              }}
            >
              3. Inconsistencia Operativa
            </h4>
            <p
              style={{
                margin: 0,
                color: theme.textGray,
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              La duplicidad de datos genera errores en cobros y retrasa la
              emisión de libretas académicas.
            </p>
          </div>
        </div>
      ),
      visual: (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "25px",
          }}
        >
          <div style={{ display: "flex", gap: "20px", width: "100%" }}>
            <div
              style={{
                flex: 1,
                background: "rgba(244, 63, 94, 0.1)",
                border: `1px solid ${theme.danger}`,
                borderRadius: "8px",
                padding: "25px 15px",
                textAlign: "center",
                backdropFilter: theme.glassFilter,
                boxShadow: theme.glowDanger,
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>📁</div>
              <div
                style={{
                  color: theme.textDark,
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Secretaría
              </div>
              <div
                style={{
                  color: theme.danger,
                  fontSize: "13px",
                  marginTop: "5px",
                }}
              >
                Archivos Locales
              </div>
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(244, 63, 94, 0.1)",
                border: `1px solid ${theme.danger}`,
                borderRadius: "8px",
                padding: "25px 15px",
                textAlign: "center",
                backdropFilter: theme.glassFilter,
                boxShadow: theme.glowDanger,
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>💳</div>
              <div
                style={{
                  color: theme.textDark,
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Tesorería
              </div>
              <div
                style={{
                  color: theme.danger,
                  fontSize: "13px",
                  marginTop: "5px",
                }}
              >
                Sistema Aislado
              </div>
            </div>
          </div>
          <div
            style={{
              color: theme.danger,
              fontWeight: "bold",
              fontSize: "14px",
              letterSpacing: "2px",
              textShadow: "0 0 8px rgba(244, 63, 94, 0.5)",
            }}
          >
            ✖ SIN INTEROPERABILIDAD ✖
          </div>
          <div
            style={{
              width: "60%",
              background: "rgba(244, 63, 94, 0.1)",
              border: `1px solid ${theme.danger}`,
              borderRadius: "8px",
              padding: "25px 15px",
              textAlign: "center",
              backdropFilter: theme.glassFilter,
              boxShadow: theme.glowDanger,
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "10px" }}>📚</div>
            <div
              style={{
                color: theme.textDark,
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Área Académica
            </div>
            <div
              style={{
                color: theme.danger,
                fontSize: "13px",
                marginTop: "5px",
              }}
            >
              Registros Físicos
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      layout: "full",
      title: "Objetivo General",
      content: (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: theme.bgPanel,
              border: `2px solid ${theme.primary}`,
              padding: "60px",
              borderRadius: "12px",
              maxWidth: "85%",
              backdropFilter: theme.glassFilter,
              boxShadow: theme.glowPrimary,
            }}
          >
            <p
              style={{
                fontSize: "26px",
                lineHeight: "1.6",
                color: theme.textDark,
                textAlign: "center",
                fontWeight: "300",
                margin: 0,
              }}
            >
              "Diseñar una Arquitectura Empresarial estructurada en los marcos{" "}
              <strong style={{ color: theme.primary, fontWeight: "bold" }}>
                TOGAF
              </strong>{" "}
              y{" "}
              <strong style={{ color: theme.accent, fontWeight: "bold" }}>
                SOA
              </strong>{" "}
              que permita alinear de manera eficiente los procesos de gestión
              académica y administrativa con los objetivos estratégicos de la
              institución."
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      layout: "full",
      title: "Objetivos Específicos",
      content: (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              width: "100%",
            }}
          >
            <div
              style={{
                background: theme.bgPanel,
                padding: "30px",
                borderRadius: "12px",
                border: `1px solid rgba(56, 189, 248, 0.4)`,
                backdropFilter: theme.glassFilter,
                boxShadow: theme.glowPrimary,
              }}
            >
              <div
                style={{
                  color: theme.primary,
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                01. Identificar
              </div>
              <p
                style={{
                  fontSize: "15px",
                  color: theme.textGray,
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Levantamiento de las necesidades de los usuarios aplicando
                métodos formales de ingeniería de requerimientos.
              </p>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                padding: "30px",
                borderRadius: "12px",
                border: `1px solid rgba(56, 189, 248, 0.4)`,
                backdropFilter: theme.glassFilter,
                boxShadow: theme.glowPrimary,
              }}
            >
              <div
                style={{
                  color: theme.primary,
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                02. Analizar
              </div>
              <p
                style={{
                  fontSize: "15px",
                  color: theme.textGray,
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Evaluación detallada de la arquitectura actual (AS-IS),
                documentando flujos operativos manuales y sistemas
                desconectados.
              </p>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                padding: "30px",
                borderRadius: "12px",
                border: `1px solid rgba(167, 139, 250, 0.4)`,
                backdropFilter: theme.glassFilter,
                boxShadow: theme.glowAccent,
              }}
            >
              <div
                style={{
                  color: theme.accent,
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                03. Proponer
              </div>
              <p
                style={{
                  fontSize: "15px",
                  color: theme.textGray,
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Diseño de la estructura objetivo (TO-BE) bajo el estándar TOGAF,
                cubriendo los niveles de negocio, datos, software y tecnología
                física.
              </p>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                padding: "30px",
                borderRadius: "12px",
                border: `1px solid rgba(167, 139, 250, 0.4)`,
                backdropFilter: theme.glassFilter,
                boxShadow: theme.glowAccent,
              }}
            >
              <div
                style={{
                  color: theme.accent,
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                04. Diseñar
              </div>
              <p
                style={{
                  fontSize: "15px",
                  color: theme.textGray,
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Modelado de integración utilizando arquitectura de servicios
                (SOA) para garantizar que los módulos interactúen
                automáticamente.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      layout: "full",
      title: "Alcance del Diseño Arquitectónico",
      content: (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "20px",
              width: "100%",
            }}
          >
            <div
              style={{
                background: theme.bgPanel,
                padding: "25px 35px",
                borderRadius: "12px",
                border: theme.border,
                display: "flex",
                alignItems: "center",
                gap: "25px",
                backdropFilter: theme.glassFilter,
              }}
            >
              <div
                style={{
                  background: "rgba(56, 189, 248, 0.1)",
                  padding: "15px",
                  borderRadius: "50%",
                  color: theme.primary,
                  fontSize: "24px",
                  boxShadow: theme.glowPrimary,
                }}
              >
                📍
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "18px",
                    color: theme.textDark,
                  }}
                >
                  Límite Institucional
                </h4>
                <p
                  style={{ margin: 0, fontSize: "15px", color: theme.textGray }}
                >
                  El diseño se aplica de manera exclusiva a la operatividad e
                  infraestructura de la <strong>Sede Carapongo</strong>.
                </p>
              </div>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                padding: "25px 35px",
                borderRadius: "12px",
                border: theme.border,
                display: "flex",
                alignItems: "center",
                gap: "25px",
                backdropFilter: theme.glassFilter,
              }}
            >
              <div
                style={{
                  background: "rgba(167, 139, 250, 0.1)",
                  padding: "15px",
                  borderRadius: "50%",
                  color: theme.accent,
                  fontSize: "24px",
                  boxShadow: theme.glowAccent,
                }}
              >
                📐
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "18px",
                    color: theme.textDark,
                  }}
                >
                  Cobertura Metodológica
                </h4>
                <p
                  style={{ margin: 0, fontSize: "15px", color: theme.textGray }}
                >
                  Desarrollo completo de los cuatro dominios arquitectónicos:{" "}
                  <strong>Negocio, Datos, Aplicaciones y Tecnología</strong>.
                </p>
              </div>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                padding: "25px 35px",
                borderRadius: "12px",
                border: theme.border,
                display: "flex",
                alignItems: "center",
                gap: "25px",
                backdropFilter: theme.glassFilter,
              }}
            >
              <div
                style={{
                  background: "rgba(203, 213, 225, 0.1)",
                  padding: "15px",
                  borderRadius: "50%",
                  color: theme.textGray,
                  fontSize: "24px",
                }}
              >
                ⚙️
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "18px",
                    color: theme.textDark,
                  }}
                >
                  Límites de Ejecución
                </h4>
                <p
                  style={{ margin: 0, fontSize: "15px", color: theme.textGray }}
                >
                  Se entregan los planos estructurales, prototipos UX/UI y el
                  plan de migración.{" "}
                  <strong>
                    No contempla la codificación funcional en producción
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // --- NUEVA DIAPOSITIVA: MARCO METODOLÓGICO (CAPÍTULO 2) ---
    {
      id: 6,
      layout: "full",
      title: "Marco Metodológico y Estándares (Capítulo II)",
      content: (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "25px",
              width: "100%",
            }}
          >
            <div
              style={{
                background: theme.bgPanel,
                padding: "35px 25px",
                borderRadius: "12px",
                border: `1px solid rgba(56, 189, 248, 0.4)`,
                backdropFilter: theme.glassFilter,
                boxShadow: theme.glowPrimary,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "rgba(56, 189, 248, 0.1)",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  marginBottom: "20px",
                  color: theme.primary,
                }}
              >
                🏛️
              </div>
              <h4
                style={{
                  margin: "0 0 15px 0",
                  color: theme.primary,
                  fontSize: "18px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Framework TOGAF (ADM)
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: theme.textGray,
                  lineHeight: "1.6",
                }}
              >
                Utilizado como marco de trabajo principal. Proporciona el Método
                de Desarrollo de la Arquitectura (ADM) iterativo para
                estructurar las capas de Negocio, Datos, Aplicaciones y
                Tecnología.
              </p>
            </div>

            <div
              style={{
                background: theme.bgPanel,
                padding: "35px 25px",
                borderRadius: "12px",
                border: `1px solid rgba(167, 139, 250, 0.4)`,
                backdropFilter: theme.glassFilter,
                boxShadow: theme.glowAccent,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "rgba(167, 139, 250, 0.1)",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  marginBottom: "20px",
                  color: theme.accent,
                }}
              >
                🔌
              </div>
              <h4
                style={{
                  margin: "0 0 15px 0",
                  color: theme.accent,
                  fontSize: "18px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Arquitectura SOA
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: theme.textGray,
                  lineHeight: "1.6",
                }}
              >
                Patrón de diseño estratégico seleccionado para garantizar la
                escalabilidad y el desacoplamiento. Permite que sistemas
                distintos intercambien datos mediante servicios web seguros.
              </p>
            </div>

            <div
              style={{
                background: theme.bgPanel,
                padding: "35px 25px",
                borderRadius: "12px",
                border: `1px solid rgba(248, 250, 252, 0.2)`,
                backdropFilter: theme.glassFilter,
                boxShadow: theme.glowDanger,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  marginBottom: "20px",
                  color: theme.textDark,
                }}
              >
                📊
              </div>
              <h4
                style={{
                  margin: "0 0 15px 0",
                  color: theme.textDark,
                  fontSize: "18px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Modelado BPMN y UML
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: theme.textGray,
                  lineHeight: "1.6",
                }}
              >
                Estándares internacionales empleados para la representación
                visual, permitiendo mapear el flujo de los procesos de negocio
                (BPMN) y la estructura del software (UML) sin ambigüedades.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      layout: "split",
      title: "Modelo de la Solución (TO-BE)",
      text: (
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              color: theme.textDark,
              lineHeight: "1.6",
            }}
          >
            El nuevo entorno digital centraliza la operación (Capítulo III):
          </p>
          <div
            style={{
              background: theme.bgPanel,
              padding: "20px",
              borderRadius: "8px",
              border: `1px solid rgba(56, 189, 248, 0.3)`,
              backdropFilter: theme.glassFilter,
            }}
          >
            <h4
              style={{
                margin: "0 0 5px 0",
                color: theme.textDark,
                fontSize: "15px",
              }}
            >
              1. Repositorio Único (Cloud DB)
            </h4>
            <p style={{ margin: 0, color: theme.textGray, fontSize: "14px" }}>
              Establecimiento de una "Fuente Única de Verdad" alojada en la
              nube, compartida por todas las áreas.
            </p>
          </div>
          <div
            style={{
              background: theme.bgPanel,
              padding: "20px",
              borderRadius: "8px",
              border: `1px solid rgba(167, 139, 250, 0.3)`,
              backdropFilter: theme.glassFilter,
            }}
          >
            <h4
              style={{
                margin: "0 0 5px 0",
                color: theme.textDark,
                fontSize: "15px",
              }}
            >
              2. Interoperabilidad (SOA)
            </h4>
            <p style={{ margin: 0, color: theme.textGray, fontSize: "14px" }}>
              Comunicación automática vía microservicios; un pago en caja
              actualiza el estado académico al instante.
            </p>
          </div>
          <div
            style={{
              background: theme.bgPanel,
              padding: "20px",
              borderRadius: "8px",
              border: `1px solid rgba(56, 189, 248, 0.3)`,
              backdropFilter: theme.glassFilter,
            }}
          >
            <h4
              style={{
                margin: "0 0 5px 0",
                color: theme.textDark,
                fontSize: "15px",
              }}
            >
              3. Acceso Omnicanal
            </h4>
            <p style={{ margin: 0, color: theme.textGray, fontSize: "14px" }}>
              Interfaces digitales autogestionables para padres, profesores y
              conexiones seguras con SUNAT.
            </p>
          </div>
        </div>
      ),
      visual: (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, #0284c7)`,
                color: "#fff",
                padding: "20px 40px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "center",
                boxShadow: theme.glowPrimary,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              ☁️ CORE CENTRAL
              <br />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: "#e0f2fe",
                }}
              >
                Base de Datos Única Unificada
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                borderLeft: `2px dashed ${theme.textGray}`,
                height: "40px",
              }}
            ></div>
            <div
              style={{
                borderLeft: `2px dashed ${theme.textGray}`,
                height: "40px",
              }}
            ></div>
            <div
              style={{
                borderLeft: `2px dashed ${theme.textGray}`,
                height: "40px",
              }}
            ></div>
          </div>
          <div style={{ display: "flex", gap: "20px", width: "100%" }}>
            <div
              style={{
                flex: 1,
                background: "rgba(56, 189, 248, 0.1)",
                border: `1px solid ${theme.primary}`,
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "bold",
                color: theme.textDark,
                backdropFilter: theme.glassFilter,
              }}
            >
              Portal Padres
              <br />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: theme.primary,
                }}
              >
                Web / App Móvil
              </span>
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(167, 139, 250, 0.1)",
                border: `1px solid ${theme.accent}`,
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "bold",
                color: theme.textDark,
                backdropFilter: theme.glassFilter,
              }}
            >
              Módulo Académico
              <br />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: theme.accent,
                }}
              >
                Intranet Docentes
              </span>
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(56, 189, 248, 0.1)",
                border: `1px solid ${theme.primary}`,
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "bold",
                color: theme.textDark,
                backdropFilter: theme.glassFilter,
              }}
            >
              Módulo Financiero
              <br />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: theme.primary,
                }}
              >
                Tesorería / SUNAT
              </span>
            </div>
          </div>
        </div>
      ),
    },
    // --- NUEVA DIAPOSITIVA: ROADMAP Y BRECHAS (CAPÍTULO 4) ---
    {
      id: 8,
      layout: "full",
      title: "Plan de Migración y Roadmap (Capítulo IV)",
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              color: theme.textGray,
              textAlign: "center",
              maxWidth: "80%",
              alignSelf: "center",
            }}
          >
            De acuerdo a las Fases E (Oportunidades y Soluciones) y F
            (Planificación de la Migración) de TOGAF, se establece una
            transición escalonada para mitigar riesgos operativos:
          </p>

          <div
            style={{
              display: "flex",
              width: "100%",
              position: "relative",
              marginTop: "20px",
              padding: "0 20px",
            }}
          >
            {/* Línea conectora base */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50px",
                right: "50px",
                height: "4px",
                background: "rgba(255,255,255,0.1)",
                transform: "translateY(-50%)",
                zIndex: 0,
              }}
            ></div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  background: theme.bgPanel,
                  border: `1px solid ${theme.primary}`,
                  borderRadius: "12px",
                  padding: "20px",
                  width: "30%",
                  backdropFilter: theme.glassFilter,
                  boxShadow: theme.glowPrimary,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: theme.primary,
                    color: "#000",
                    padding: "5px 15px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  PAQUETE 1
                </div>
                <h4
                  style={{
                    margin: "20px 0 10px 0",
                    color: theme.textDark,
                    fontSize: "16px",
                  }}
                >
                  Consolidación Core DB
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: theme.textGray,
                    lineHeight: "1.5",
                  }}
                >
                  Migración y limpieza de datos (Excels) hacia la nueva base de
                  datos SQL Cloud centralizada.
                </p>
              </div>

              <div
                style={{
                  background: theme.bgPanel,
                  border: `1px solid ${theme.accent}`,
                  borderRadius: "12px",
                  padding: "20px",
                  width: "30%",
                  backdropFilter: theme.glassFilter,
                  boxShadow: theme.glowAccent,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: theme.accent,
                    color: "#fff",
                    padding: "5px 15px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  PAQUETE 2
                </div>
                <h4
                  style={{
                    margin: "20px 0 10px 0",
                    color: theme.textDark,
                    fontSize: "16px",
                  }}
                >
                  Despliegue Backend SOA
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: theme.textGray,
                    lineHeight: "1.5",
                  }}
                >
                  Implementación de los microservicios y APIs para conectar
                  financieramente Secretaría y Tesorería.
                </p>
              </div>

              <div
                style={{
                  background: theme.bgPanel,
                  border: `1px solid ${theme.primary}`,
                  borderRadius: "12px",
                  padding: "20px",
                  width: "30%",
                  backdropFilter: theme.glassFilter,
                  boxShadow: theme.glowPrimary,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: theme.primary,
                    color: "#000",
                    padding: "5px 15px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  PAQUETE 3
                </div>
                <h4
                  style={{
                    margin: "20px 0 10px 0",
                    color: theme.textDark,
                    fontSize: "16px",
                  }}
                >
                  Interfaces Frontend
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: theme.textGray,
                    lineHeight: "1.5",
                  }}
                >
                  Liberación progresiva del Portal Web para Padres y la Intranet
                  Académica para Docentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 9,
      layout: "full",
      title: "Conclusiones del Proyecto",
      content: (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "25px",
              width: "100%",
            }}
          >
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "30px",
                borderRadius: "12px",
                backdropFilter: theme.glassFilter,
                border: `3px solid ${theme.primary}`,
              }}
            >
              <h4
                style={{
                  color: theme.textDark,
                  fontSize: "17px",
                  margin: "0 0 10px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: theme.primary }}>✦</span> Alineación
                Estratégica Lograda
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: theme.textGray,
                  lineHeight: "1.6",
                }}
              >
                La tecnología evoluciona de ser un centro de soporte operativo a
                un recurso estratégico que permite escalar la matrícula escolar
                y mejorar la calidad del servicio.
              </p>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "30px",
                borderRadius: "12px",
                backdropFilter: theme.glassFilter,
                border: `3px solid ${theme.accent}`,
              }}
            >
              <h4
                style={{
                  color: theme.textDark,
                  fontSize: "17px",
                  margin: "0 0 10px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: theme.accent }}>✦</span> Eficiencia
                mediante SOA
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: theme.textGray,
                  lineHeight: "1.6",
                }}
              >
                La arquitectura orientada a servicios permite que eventos
                administrativos (un pago en caja) activen funciones académicas
                (acceso a notas) instantáneamente.
              </p>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "30px",
                borderRadius: "12px",
                backdropFilter: theme.glassFilter,
                border: `3px solid ${theme.primary}`,
              }}
            >
              <h4
                style={{
                  color: theme.textDark,
                  fontSize: "17px",
                  margin: "0 0 10px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: theme.primary }}>✦</span> Consolidación de
                la Información
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: theme.textGray,
                  lineHeight: "1.6",
                }}
              >
                El diseño asegura una base de datos única, eliminando los
                registros paralelos de Excel y garantizando reportes precisos
                para auditorías y la toma de decisiones.
              </p>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "30px",
                borderRadius: "12px",
                backdropFilter: theme.glassFilter,
                border: `3px solid ${theme.accent}`,
              }}
            >
              <h4
                style={{
                  color: theme.textDark,
                  fontSize: "17px",
                  margin: "0 0 10px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ color: theme.accent }}>✦</span> Viabilidad de
                Transición
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: theme.textGray,
                  lineHeight: "1.6",
                }}
              >
                El plan de paquetes de trabajo (roadmap) demuestra que la
                transición hacia el modelo TO-BE es segura, progresiva y medible
                operativamente sin detener el año escolar.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      layout: "full",
      title: "Recomendaciones Estratégicas",
      content: (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "15px",
              width: "100%",
            }}
          >
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "20px 30px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "25px",
                backdropFilter: theme.glassFilter,
              }}
            >
              <div
                style={{
                  color: theme.primary,
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                01.
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "16px",
                    color: theme.textDark,
                  }}
                >
                  Establecer Gobernanza de TI
                </h4>
                <p
                  style={{ margin: 0, fontSize: "15px", color: theme.textGray }}
                >
                  Constituir el Comité de Control de Cambios propuesto antes de
                  programar el software, para proteger la integridad de la
                  arquitectura diseñada.
                </p>
              </div>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "20px 30px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "25px",
                backdropFilter: theme.glassFilter,
              }}
            >
              <div
                style={{
                  color: theme.accent,
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                02.
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "16px",
                    color: theme.textDark,
                  }}
                >
                  Gestión del Cambio Organizacional
                </h4>
                <p
                  style={{ margin: 0, fontSize: "15px", color: theme.textGray }}
                >
                  Ejecutar talleres prácticos con docentes y personal
                  administrativo para mitigar la resistencia a abandonar sus
                  procesos manuales heredados.
                </p>
              </div>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "20px 30px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "25px",
                backdropFilter: theme.glassFilter,
              }}
            >
              <div
                style={{
                  color: theme.primary,
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                03.
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "16px",
                    color: theme.textDark,
                  }}
                >
                  Aprovechamiento Cloud (Fase 2)
                </h4>
                <p
                  style={{ margin: 0, fontSize: "15px", color: theme.textGray }}
                >
                  Utilizar la flexibilidad y escalabilidad de la nube para
                  integrar posteriormente módulos de Aula Virtual (LMS),
                  optimizando la inversión inicial.
                </p>
              </div>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "20px 30px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "25px",
                backdropFilter: theme.glassFilter,
              }}
            >
              <div
                style={{
                  color: theme.accent,
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                04.
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "16px",
                    color: theme.textDark,
                  }}
                >
                  Seguridad y Cumplimiento Normativo
                </h4>
                <p
                  style={{ margin: 0, fontSize: "15px", color: theme.textGray }}
                >
                  Auditar anualmente las políticas de protección de datos
                  personales de los estudiantes, manteniendo actualizados los
                  protocolos de encriptación.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 11,
      layout: "full",
      title: "Referencias Bibliográficas Clave",
      content: (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "20px",
              width: "100%",
            }}
          >
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "25px 30px",
                borderRadius: "12px",
                backdropFilter: theme.glassFilter,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  color: theme.textDark,
                  lineHeight: "1.5",
                }}
              >
                <strong style={{ color: theme.primary }}>Bernard, S. A.</strong>{" "}
                (2012). <em>An Introduction to Enterprise Architecture</em> (3.ª
                ed.). AuthorHouse.
              </p>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "25px 30px",
                borderRadius: "12px",
                backdropFilter: theme.glassFilter,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  color: theme.textDark,
                  lineHeight: "1.5",
                }}
              >
                <strong style={{ color: theme.accent }}>Erl, T.</strong> (2005).{" "}
                <em>
                  Service-Oriented Architecture: Concepts, Technology, and
                  Design
                </em>
                . Prentice Hall.
              </p>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "25px 30px",
                borderRadius: "12px",
                backdropFilter: theme.glassFilter,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  color: theme.textDark,
                  lineHeight: "1.5",
                }}
              >
                <strong style={{ color: theme.primary }}>Lankhorst, M.</strong>{" "}
                (2013).{" "}
                <em>
                  Enterprise Architecture at Work: Modelling, Communication and
                  Analysis
                </em>{" "}
                (3.ª ed.). Springer.
              </p>
            </div>
            <div
              style={{
                background: theme.bgPanel,
                border: theme.border,
                padding: "25px 30px",
                borderRadius: "12px",
                backdropFilter: theme.glassFilter,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  color: theme.textDark,
                  lineHeight: "1.5",
                }}
              >
                <strong style={{ color: theme.accent }}>Sommerville, I.</strong>{" "}
                (2011). <em>Ingeniería de software</em> (9.ª ed.).
                Addison-Wesley.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 12,
      type: "cover",
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: theme.bgMain,
          }}
        >
          <div
            style={{
              width: "100px",
              height: "4px",
              background: theme.primary,
              marginBottom: "40px",
              borderRadius: "2px",
              boxShadow: theme.glowPrimary,
            }}
          ></div>
          <h1
            style={{
              fontSize: "75px",
              color: theme.textDark,
              fontWeight: "900",
              letterSpacing: "6px",
              margin: "0 0 20px 0",
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            ¡GRACIAS!
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: theme.primary,
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontWeight: "bold",
            }}
          >
            Fin de la Sustentación
          </p>
          <div
            style={{
              width: "100px",
              height: "4px",
              background: theme.accent,
              marginTop: "40px",
              borderRadius: "2px",
              boxShadow: theme.glowAccent,
            }}
          ></div>
        </div>
      ),
    },
  ];

  // --- EXPORTADOR A4 HORIZONTAL ---
  const exportToPDF = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < slides.length; i++) {
        const slideElement = slidesRef.current[i];
        if (!slideElement) continue;

        const canvas = await html2canvas(slideElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#0f172a",
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png", 1.0);

        const imgProps = pdf.getImageProperties(imgData);
        const ratio = Math.min(
          pdfWidth / imgProps.width,
          pdfHeight / imgProps.height,
        );
        const targetWidth = imgProps.width * ratio;
        const targetHeight = imgProps.height * ratio;

        const x = (pdfWidth - targetWidth) / 2;
        const y = (pdfHeight - targetHeight) / 2;

        if (i > 0) {
          pdf.addPage("a4", "landscape");
        }

        pdf.setFillColor(15, 23, 42);
        pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
        pdf.addImage(imgData, "PNG", x, y, targetWidth, targetHeight);
      }
      pdf.save("Sustentacion_Cruz_Saco_A4.pdf");
    } catch (error) {
      console.error("Error PDF:", error);
      alert("Error generando el documento PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: document.fullscreenElement ? "100vw" : "1200px",
        height: document.fullscreenElement ? "100vh" : "auto",
        margin: "0 auto",
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        background: theme.bgMain,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 25px",
          background: "rgba(15, 23, 42, 0.9)",
          borderBottom: theme.border,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide((c) => c - 1)}
            style={{
              padding: "8px 16px",
              cursor: currentSlide === 0 ? "not-allowed" : "pointer",
              background: currentSlide === 0 ? "#334155" : theme.primary,
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            ◀ Ant
          </button>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: theme.textGray,
            }}
          >
            Slide {currentSlide + 1} / {slides.length}
          </span>
          <button
            disabled={currentSlide === slides.length - 1}
            onClick={() => setCurrentSlide((c) => c + 1)}
            //flecha derecha = siguiente

            style={{
              padding: "8px 16px",
              cursor:
                currentSlide === slides.length - 1 ? "not-allowed" : "pointer",
              background:
                currentSlide === slides.length - 1 ? "#334155" : theme.primary,
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            Sig ▶
          </button>
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={toggleFullScreen}
            style={{
              padding: "8px 16px",
              background: "transparent",
              border: `1px solid ${theme.primary}`,
              color: theme.primary,
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            {document.fullscreenElement
              ? "🗗 Salir FullScreen"
              : "📺 Pantalla Completa"}
          </button>
          {!document.fullscreenElement && (
            <button
              onClick={exportToPDF}
              disabled={isExporting}
              style={{
                padding: "8px 16px",
                background: theme.accent,
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: isExporting ? "wait" : "pointer",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              {isExporting ? "⏳ Generando A4..." : "📄 Exportar PDF (A4)"}
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          aspectRatio: document.fullscreenElement ? "auto" : "16/9",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              ref={(el) => (slidesRef.current[index] = el)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                padding: slide.type === "cover" ? "0" : "40px 80px",
                boxSizing: "border-box",
                background: theme.bgMain,
                opacity: isActive || isExporting ? 1 : 0,
                visibility: isActive || isExporting ? "visible" : "hidden",
                transform: isActive || isExporting ? "scale(1)" : "scale(0.97)",
                transition: isExporting
                  ? "none"
                  : "opacity 0.6s ease, transform 0.6s ease, visibility 0.6s",
                zIndex: isActive ? 10 : 1,
              }}
            >
              {slide.type === "cover" ? (
                <div style={{ height: "100%" }}>{slide.content}</div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: theme.textDark,
                      borderBottom: theme.border,
                      paddingBottom: "15px",
                      fontSize: "26px",
                      margin: "0 0 35px 0",
                      fontWeight: "700",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "26px",
                        background: theme.primary,
                        marginRight: "15px",
                        borderRadius: "3px",
                        boxShadow: `0 0 10px ${theme.primary}`,
                      }}
                    ></div>
                    {slide.title}
                  </h2>

                  {slide.layout === "split" ? (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "45% 55%",
                        gap: "40px",
                        flex: 1,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        {slide.text}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: theme.bgPanel,
                          borderRadius: "12px",
                          border: theme.border,
                          padding: "30px",
                          backdropFilter: theme.glassFilter,
                        }}
                      >
                        <div style={{ width: "100%" }}>{slide.visual}</div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {slide.content}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PresentationViewer;
