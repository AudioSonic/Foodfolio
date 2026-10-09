using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Foodfolio.Server.Migrations
{
    /// <inheritdoc />
    public partial class CascadeDeleteFoodUnits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Units_Foods_FoodId",
                table: "Units");

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Foods_FoodId",
                table: "Units",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Units_Foods_FoodId",
                table: "Units");

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Foods_FoodId",
                table: "Units",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "Id");
        }
    }
}
