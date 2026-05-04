using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Psidly.Shared.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddAllTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "convenio",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    psychologist_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_convenio", x => x.id);
                    table.ForeignKey(
                        name: "fk_convenio_user_psychologist_id",
                        column: x => x.psychologist_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "emocao",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_emocao", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "patient",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    cpf = table.Column<string>(type: "text", nullable: false),
                    birth_date = table.Column<DateOnly>(type: "date", nullable: false),
                    insurance = table.Column<string>(type: "text", nullable: false),
                    photo = table.Column<string>(type: "text", nullable: true),
                    is_hidden = table.Column<bool>(type: "boolean", nullable: false),
                    psychologist_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_patient", x => x.id);
                    table.ForeignKey(
                        name: "fk_patient_user_psychologist_id",
                        column: x => x.psychologist_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "avaliation",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date = table.Column<DateOnly>(type: "date", nullable: false),
                    hour = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    obs_psicologo = table.Column<string>(type: "text", nullable: true),
                    obs_paciente = table.Column<string>(type: "text", nullable: true),
                    patient_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_avaliation", x => x.id);
                    table.ForeignKey(
                        name: "fk_avaliation_patient_patient_id",
                        column: x => x.patient_id,
                        principalTable: "patient",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "avaliation_emocao",
                columns: table => new
                {
                    avaliation_id = table.Column<int>(type: "integer", nullable: false),
                    emocao_id = table.Column<int>(type: "integer", nullable: false),
                    nivel_emocao = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_avaliation_emocao", x => new { x.avaliation_id, x.emocao_id });
                    table.ForeignKey(
                        name: "fk_avaliation_emocao_avaliation_avaliation_id",
                        column: x => x.avaliation_id,
                        principalTable: "avaliation",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_avaliation_emocao_emocao_emocao_id",
                        column: x => x.emocao_id,
                        principalTable: "emocao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_avaliation_patient_id",
                table: "avaliation",
                column: "patient_id");

            migrationBuilder.CreateIndex(
                name: "ix_avaliation_emocao_emocao_id",
                table: "avaliation_emocao",
                column: "emocao_id");

            migrationBuilder.CreateIndex(
                name: "ix_convenio_psychologist_id",
                table: "convenio",
                column: "psychologist_id");

            migrationBuilder.CreateIndex(
                name: "ix_patient_psychologist_id",
                table: "patient",
                column: "psychologist_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "avaliation_emocao");

            migrationBuilder.DropTable(
                name: "convenio");

            migrationBuilder.DropTable(
                name: "avaliation");

            migrationBuilder.DropTable(
                name: "emocao");

            migrationBuilder.DropTable(
                name: "patient");
        }
    }
}
