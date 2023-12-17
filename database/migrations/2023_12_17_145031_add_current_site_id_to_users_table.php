<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCurrentSiteIdToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('current_site_id')->nullable()->after('current_organization_id');

            // If you want to add a foreign key constraint
            $table->foreign('current_site_id')->references('id')->on('sites')->onDelete('set null');
        });
        }
        
        
        public function down()
        {
            Schema::table('users', function (Blueprint $table) {
                $table->dropForeign(['current_site_id']);
                $table->dropColumn('current_site_id');
            });
        }
    }