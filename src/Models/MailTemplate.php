<?php

namespace Mckenziearts\Shopper\Models;

use Illuminate\Database\Eloquent\Model;

class MailTemplate extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_mails_templates';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'template_name', 'template_slug', 'template_type', 'template_view_name', 'template_skeleton', 'template_description'
    ];
}
