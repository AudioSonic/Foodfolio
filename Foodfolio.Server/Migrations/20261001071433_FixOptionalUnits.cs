using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Foodfolio.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixOptionalUnits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OptionalUnit_Foods_FoodId",
                table: "OptionalUnit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OptionalUnit",
                table: "OptionalUnit");

            migrationBuilder.RenameTable(
                name: "OptionalUnit",
                newName: "OptionalUnits");

            migrationBuilder.RenameIndex(
                name: "IX_OptionalUnit_FoodId",
                table: "OptionalUnits",
                newName: "IX_OptionalUnits_FoodId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OptionalUnits",
                table: "OptionalUnits",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OptionalUnits_Foods_FoodId",
                table: "OptionalUnits",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OptionalUnits_Foods_FoodId",
                table: "OptionalUnits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OptionalUnits",
                table: "OptionalUnits");

            migrationBuilder.RenameTable(
                name: "OptionalUnits",
                newName: "OptionalUnit");

            migrationBuilder.RenameIndex(
                name: "IX_OptionalUnits_FoodId",
                table: "OptionalUnit",
                newName: "IX_OptionalUnit_FoodId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OptionalUnit",
                table: "OptionalUnit",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OptionalUnit_Foods_FoodId",
                table: "OptionalUnit",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
