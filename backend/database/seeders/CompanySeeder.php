<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = [
            [
                'name' => 'company1',
                'domain' => 'company1.localhost',
            ],
            [
                'name' => 'company2',
                'domain' => 'company2.localhost',
            ],
            [
                'name' => 'company3',
                'domain' => 'company3.localhost',
            ],
        ];

        foreach ($companies as $company) {
            Company::create($company);
        }
    }
}


