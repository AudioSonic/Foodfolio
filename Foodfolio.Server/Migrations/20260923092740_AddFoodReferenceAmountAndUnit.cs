using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Foodfolio.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddFoodReferenceAmountAndUnit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ReferenceAmount",
                table: "Foods",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "ReferenceUnit",
                table: "Foods",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReferenceAmount",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "ReferenceUnit",
                table: "Foods");
        }
    }
}
