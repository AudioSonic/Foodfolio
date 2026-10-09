using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Foodfolio.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUnitEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OptionalUnit_Foods_FoodId",
                table: "OptionalUnit");

            migrationBuilder.DropIndex(
                name: "IX_OptionalUnit_FoodId",
                table: "OptionalUnit");

            migrationBuilder.RenameTable(
                name: "OptionalUnit",
                newName: "Units");

            migrationBuilder.AlterColumn<int>(
                name: "FoodId",
                table: "Units",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "UnitId",
                table: "RecipeIngredients",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Units_FoodId",
                table: "Units",
                column: "FoodId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredients_UnitId",
                table: "RecipeIngredients",
                column: "UnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Foods_FoodId",
                table: "Units",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredients_Units_UnitId",
                table: "RecipeIngredients",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredients_Units_UnitId",
                table: "RecipeIngredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Units_Foods_FoodId",
                table: "Units");

            migrationBuilder.DropIndex(
                name: "IX_RecipeIngredients_UnitId",
                table: "RecipeIngredients");

            migrationBuilder.DropIndex(
                name: "IX_Units_FoodId",
                table: "Units");

            migrationBuilder.DropColumn(
                name: "UnitId",
                table: "RecipeIngredients");

            migrationBuilder.AlterColumn<int>(
                name: "FoodId",
                table: "Units",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.RenameTable(
                name: "Units",
                newName: "OptionalUnit");

            migrationBuilder.CreateIndex(
                name: "IX_OptionalUnit_FoodId",
                table: "OptionalUnit",
                column: "FoodId");

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
