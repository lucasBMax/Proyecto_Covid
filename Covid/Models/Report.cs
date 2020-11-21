using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Covid.Models
{
    public class Report
    {
        public string Id { get; set; }
        public DateTime FechaReporteWeb { get; set; }
        public long IdCaso { get; set; }
        public DateTime FechaNotificacion  { get; set; }
        public int CodigoDivipolaDepto { get; set; }
        public string NombreDepto { get; set; }
        public int CodigoDiviPolaMun { get; set; }
        public string NombreMun { get; set; }
        public int Edad{ get; set; }
        public int UnidadMedida { get; set; }
        public string Sexo { get; set; }
        public string TipoContagio { get; set; }
        public string UbicacionCaso { get; set; }
        public string Estado { get; set; }
        public int CodigoIsoPais { get; set; }
        public string NombrePais { get; set; }
        public string Recuperado { get; set; }
        public DateTime FechaIniSintomas { get; set; }
        public DateTime FechaMuerte { get; set; }
        public DateTime FechaDiagnostico { get; set; }
        public DateTime FechaRecuperacion { get; set; }
        public string TipoRecuperacion { get; set; }
        public string PertenenciaEtnica { get; set; }
        public string NombreGrupoEtnico { get; set; }
       
        public Report()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}