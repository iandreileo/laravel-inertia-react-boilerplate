<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeSettingsNullableInWidgetsTable extends Migration
{
    public function up()
    {
        Schema::table('widgets', function (Blueprint $table) {
            $table->json('settings')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('widgets', function (Blueprint $table) {
            $table->json('settings')->nullable(false)->change();
        });
    }
}
